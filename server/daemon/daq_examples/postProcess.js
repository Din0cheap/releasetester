/*
 *        server.js
 * Copyright (c) 2017 William A Coolidge
 */

'use strict';

const
// src functions
    Promise   = require('bluebird'),
    adsClient = require('./ads'),
    dbClient = require('./db'),
    instrument = require('./instrument'),
    process = require('./process'),
    // src objects
    config = require('../../system_json/servicesConfig.json'),
    testConfig = require('../../system_json/testConfig.json'),
    tests = testConfig.tests,
    // modules
    _ = require('underscore-contrib'),
    timer = require('nanotimer'),
    express = require('express'),
    http = require('http'),
    app = express(),
    colors = require('colors'),
    debug = require('debug')('postProcess');

colors.setTheme({
    input: 'grey',
    verbose: 'cyan',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
});
// target data!!!!!!!
let field = 'sampleCount';

let sampleCountArray = [];


const processChunk = function processChunk(store, test, target, chunkIndex) {
    return new Promise((resolve, reject) => {
        let allDataFetched;

        debug('processChunk: index '.info, chunkIndex);
        // get query for fields in chunks defined by target.postProcessSize
        dbClient.queryArgs(test, target, chunkIndex)
            .then(argResult => {
               // debug('query ', query);
                return dbClient.queryInflux(store.db, argResult.queryString, argResult.options)
            })
            .then(response => {
                if (_.isUndefined(response)) {
                    allDataFetched = true;
                    console.log('postProcess: all data fetched '.info);
                    return Promise.resolve().then(() => {
                        return null;
                    });
                } else {
                    console.log('postProcess: query success with length '.info, response.length);
                    allDataFetched = (response.length < target.postProcessDataSize) ? true : false;

                    return process.saveToCsv(test, store, response, chunkIndex);
                }
            })
            .then(result => {
                if (!_.isNull(result) && (allDataFetched != true)) {
                    console.log('postProcess: wrote csv file '.info, result, ' recursing');
                    return processChunk(store, test, target, ++chunkIndex);
                } else {
                    console.log('postProcess: complete'.info);
                    return Promise.resolve().then(() => {
                        return chunkIndex;
                    });
                }
            })
            .catch(err => {
                console.log('query error '.error, err);
                return err;
            })
    });
}

// each test ( measurement in influxdb terms ) consists of multiple ads targets,
// each with multiple logicals stores. An ads target may only appear once (shall be unique) in all tests,
// logical storage targets may appear multiple times

for (let m = 0; m < tests.length; m++) {
    let test = tests[m];

    // adsClient.validateAdsConfig(test);

    // console.log of test config
    // instrument.testToConsole(test);

    // each test (set of measurements) is instrumented with an array of targets
    // a target is an ads source (plc) with associated logical stores

    let targets = test.targets;
    for (let t = 0; t < targets.length; t++) {
        let target = targets[t];
        let adsTarget = target.adsTarget;

        // query and csv columns from target.postProcess
        let fields = target.postProcess;

        // setup the db data configuration from the test configuration
        // multiple logical stores for each ads target
        // this could be embedded in adsClient.connect, left here for clarity
        //_.each(logicalStorage, function dbInstantiaton(store, key, logicalStorage) {
        let logicalStorage = target.logicalStorage;


        for (let logicalStoreIndex = 0; logicalStoreIndex < logicalStorage.length; logicalStoreIndex++) {
            let logicalStore = logicalStorage[logicalStoreIndex];

            // create database connections, store is appended with
            logicalStore.db = dbClient.dbInstantiation(test, target, logicalStore);

            processChunk(logicalStore, test, target, 0, false);

        } // logical storage loop
    } // target loop
} // test (measurement) loop
