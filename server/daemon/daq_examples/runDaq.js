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
    debug = require('debug')('server');

colors.setTheme({
    input: 'grey',
    verbose: 'cyan',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
});

let sampler = new timer();
let client;
let adsClients = [];
let lastSamples = [];
lastSamples['sampleCount'] = 0;  //NOTE ASSUMPTION that all ADS arrays includes this
const sampleInterval = 1;  // assuming notification on each scan, i.e scanCount incrementation of 1


// Server code for instrumenting and aquiring data off of ads targets (plcs)
// and writing to the respective database targets

// preconditions: complete and correct json configuration
//                instantiate databases from system_json
//                0) InfluxDB accepts no spaces in tags! ==> testConfig.json
//                shall have no spaces in veys or values!!!! (results in error 400)
//                1) multiple tests can be run constrained to:
//                each adsTarget (plc) can only appear once in all tests
//                TODO: add error checking for this, and better, remove this constraint
//                2) No co-hosting of adsTargets
//                3) adsTargets cannot be co-hosted with this service
//                4) all ads property names (propnames) and symnames shall be unique (influxdb requirement)
//                   This requirement means that no duplicate array element names unless they are used in
//                   separate influxdb 'measurements'. One test (measurement) implies unique names (field)

// TODO: add adsSamples as objects with sample time so that slower sample times
//       of individual ads symnames is possible. The standard use-case is to use
//       adsNotifications of array(s) that include a clock sample count so that they
//       are auto notified on change. Thus, adsSamples can be used for slower data and
//       it would be useful to be able to specifiy an individual
//       rather than common sample rate


// test (below) is the active processing object and is used throughout.
// a representation of test can be viewed on the console at runtime.
// test from testConfig.json is both the configuration of the specific test
// and the processing object where the target client connection objects
// are found and used in communication.
// test defines the names of the target (plc and db) configuration files
// as well as the symnames that are instrumented for the test
// The other configuration files for the targets should be constant
// over the lifecylce of the project

// dbConfig is for a specific 'logical database' on a specific logicalStorage service.
// thus, a single hosted logicalStorage service (a 'physical database' in normal terms)
// can have many different logical databases and thus many dbConfig files.
// dbConfig is the mechanism whereby multiple 'databases' can be employed,
// whether co-hosted or heterogenous logicalStorage systems on letious hosts.

var writeAcquistion = function writeAcquistion(db, samples) {
    // _.each(logicalStorage, function writeToTarget(store) {


    // create database connections
    db = dbClient.dbInstantiation(dbConfig, testConfig);

    // TODO: setup objects under all targets, use the test to contain all
    // xxxClient instances and pass test as argument under operation
    //  });
}

/*
function notifcationPromise(client) {
    return new Promise((resolve, reject, notify) => {
        client.on('notification', function (handle) {
            debug('on notification:'.info, handle.symname.verbose);
            let notifiedSamples = adsClient.marshalObjectSamples(handle);


            if (_.isEmpty(notifiedSamples)) {
                reject(new Error('No data from plc'));
            } else {
                resolve(notifiedSamples);
            }
            //instrument.validateSampleCount( lastSamples, notifiedSamples, sampleInterval );

            //lastSamples := notifiedSamples;

            // write to logicalStorage
            // dbClient.storeSamples( test, target, notifiedSamples);

            //debug('Notification ', JSON.stringify(notifiedSamples, 0, 2));
        });
    });
}
*/

// each test ( measurement in influxdb terms ) consists of multiple ads targets,
// each with multiple logicals stores. An ads target may only appear once (shall be unique) in all tests,
// logical storage targets may appear multiple times

for (let m = 0; m < tests.length; m++) {
    let test = tests[m];

    adsClient.validateAdsConfig(test);

    // console.log of test config
    instrument.testToConsole(test);

    // each test (set of measurements) is instrumented with an array of targets
    // a target is an ads source (plc) with associated logical stores

    let targets = test.targets;
    for (let t = 0; t < targets.length; t++) {
        let target = targets[t];
        let adsTarget = target.adsTarget;

        // ads ínstrumentation
        // Setup sampling (polling) for each client as the callback to the connection.
        // Connect to each ads target and save client connection in target.adsClient

        debug('adsTarget', JSON.stringify(adsTarget, 0, 2));

        let adsConfig = require('../../system_json/' + adsTarget + '.json');

        // get the project name from the the target file name
        // this will be used to identify the client connection
        adsConfig.targetName = adsTarget;

        // setup of sampling (polling) loop is callback to connection

        // pre-condition: check that sampling is configured in the right SI range
        // sampling
        let sampleRate = Number(adsConfig.adsTarget.pollRate.slice(0, -1));
        if (sampleRate > 999) {
            console.log(colors.red("use the next larger SI time unit in the configuration of the adsTarget.pollRate in the file ", adsTarget, ".json instead of ", sampleRate, " for intervals > 999"));
            process.exit();
        }

        let sampleAds = function sampleAds() {
            let polledSamples = [];
            _.each(target.adsSamples, function adsRead(symName) {
                let group = adsClient.handleGroup(symName);
                let offset = adsClient.handleIndex(symName);

                adsClient.read(client, adsConfig, group, offset, polledSamples);
            });
            // write to logicalStorage once
            dbClient.storeSamples(test, target, polledSamples);
            polledSamples = [];
        }

        debug('Connecting to '.green, ' : ', adsConfig.targetName.data);

        // callback for all ads operations under connection
        let adsOperations = function adsOperations() {
            if (!_.isEmpty(target.adsSamples)) {
                // sample loop with explict reads of ads variables and arrays
                sampler.setInterval(sampleAds, "", adsConfig.adsTarget.pollRate, function (err, polledSamples) {
                    if (err) {
                        console.log('error sampling ', err);
                        sampler.clearInterval();
                        client.end();
                    }
                });
            }
        };

        // setup connection and operations callback
        client = adsClient.connect(adsConfig, adsOperations);

        // TODO: add to test target rather than adsClients as per dbClient
        // add client to the array of client connections
        adsClients.push(client);


        // setup the db data configuration from the test configuration
        // multiple logical stores for each ads target
        // this could be embedded in adsClient.connect, left here for clarity
        //_.each(logicalStorage, function dbInstantiaton(store, key, logicalStorage) {
        let logicalStorage = target.logicalStorage;
        for (let i = 0; i < logicalStorage.length; i++) {

            // create database connections, store is appended with
            logicalStorage[i].db = dbClient.dbInstantiation(test, target, logicalStorage[i]);

            // TODO: setup objects under all targets, use the test to contain all
            // xxxClient instances and pass test as argument under operation
            //});
        }
        target.logicalStorage = logicalStorage;

        if (!_.isEmpty(target.adsNotifications)) {
            debug('listening on '.info, ' : ', client.targetName.data);

            // configuration of notification events
            _.each(target.adsNotifications, function (symName) {
                let group = adsClient.handleGroup(symName);
                let offset = adsClient.handleIndex(symName);
                debug('notification configured for '.info, ' : ', symName.data);

                adsClient.notify(client, adsConfig, group, offset);
            });

            // on notification

            client.on('notification', function (handle) {
                debug('on notification:'.info, handle.symname.verbose);

                adsClient.marshalObjectSamples(handle)
                    //.then(result => {
                        //instrument.validateSampleCount( lastSamples, notifiedSamples, sampleInterval );
                        //lastSamples := notifiedSamples;
                    //})
                   .then(result => {
                        // write to logicalStorage
                        dbClient.storeSamples(test, target, result)
                    })
                    .then(result => {
                        debug('storeSamples on logicalStorage success: ',result);
                    })
                    .catch(err => {
                        console.log('storeSamples error '.error, err);
                    })
                    //debug('Notification ', JSON.stringify(notifiedSamples, 0, 2));
            });

        } // notification setup

        client.on('error', function (error) {
            console.log(client.targetName.data, ' error '.error, error.stack.error);
            client.end();
        });

        client.on('uncaught error', function (error) {
            console.log(client.targetName.data, ' uncaught error '.error, error.stack.error);
            client.end();
        });

        process.on('SIGINT', function () {
            console.log(client.targetName.data, ' SIGNINT '.warning);
            sampler.clearInterval();
            client.end();
            process.exit();
        });

        process.on('exit', function () {
            console.log("exit called".warning);
            client.end();
            process.exit();
        });

        targets[t] = target;
    } // target loop
    test.targets = targets;
    tests[m] = test;
} // test (measurement) loop

// TODO change to targets and move all console.log output here
//_.each(targets, function (target) {
//    console.log('Data aquisition on ads targets: ', target.adsClient.targetName);
//});
