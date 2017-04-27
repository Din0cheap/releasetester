const
    Promise   = require('bluebird'),
    config    = require('../../../system_json/servicesConfig.json'),
    FieldType = require('influx').FieldType,
    _         =  require('underscore-contrib'),
    ads       = require('io_ads'),
    colors      = require('colors'),
    debug     = require('debug')('adsClient');


// this is the library the encapsulates the ADS client interface

// pre-conditions:
//                => xxx.json is defined for this specific project/ads targert xxx
//                => servicesConfig.json is defined for this specific project

var status,
    client;


// this converts the ads propname array to the influx field object
exports.influxFieldsConfig = function influxFieldsConfig(test) {
    var field = {};
    _.each(test.targets, function fieldsFromAds(target) {
        const adsConfig = require('../../../system_json/' + target.adsTarget + '.json');

        // ads variables to instrument are defined in testConfig.json for measurement
        _.each(target.adsNotifications, function mapPropname(symName) {

            // but use the ads config since you need type and propname properties
            var adsElement = adsConfig[exports.handleGroup(symName)][exports.handleIndex(symName)];

            for (var i = 0; i < adsElement.propname.length; i++) {
                switch (adsElement.bytelength[i].name) {
                case 'BOOL':
                    field[adsElement.propname[i]] = FieldType.BOOLEAN;
                    break;
                case 'DINT':
                case 'INT':
                    field[adsElement.propname[i]] = FieldType.INTEGER;
                    break;
                case 'LREAL':
                case 'REAL':
                    field[adsElement.propname[i]] = FieldType.FLOAT;
                    break;
                case 'STRING':
                    field[adsElement.propname[i]] = FieldType.STRING;
                   console.log('string type needs to be tested'.warn);
                   process.exit();  // TODO: test STRING and finish this
                    break;
                }
            }
        });
    });
   // debug('influxFieldsConfig '.warn,JSON.stringify(field,0,2));
    return field;
}

// returns the ads configuration as adsOptions
exports.adsOptions = function adsOptions(doc) {
    if (_.isUndefined(doc))
        return null;
    var target = doc['adsTarget'];
    //debug('adsOptions(doc) returns',JSON.stringify(target, 0,2));
    return target;
}


// return ads handle from ads.json for string IndexGroup and IndexOffset
exports.adsHandle = function adsHandle(doc, group, offset) {
    if (_.isUndefined(doc) | _.isNull(group) | _.isNull(offset))
        return null;
    var handle = {
        "symname": group + "." + offset //,
            //"propname": offset        // autogenerated OUT property name instead of manually specified or default 'value'
    };
    var indexedGroup = doc[group]; // pick IndexGroup
    handle = _.extend(handle, indexedGroup[offset]); // pick IndexOffset
    //debug('adsHandle(doc',group,',',offset,') returns',JSON.stringify(handle, 0,2));
    return handle;
}

exports.handleGroup = function handleGroup(symName) {
    if (_.isUndefined(symName))
        return null;
    var idx = symName.indexOf('.');
    return symName.substring(0, idx); // pick IndexGroup
}

exports.handleIndex = function handleIndex(symName) {
    if (_.isUndefined(symName))
        return null;
    var idx = symName.indexOf('.') + 1;
    return symName.substring(idx); // pick IndexGroup
}


exports.adsHandles = function adsHandles(doc, group, offset) {
    if (_.isUndefined(doc) | _.isNull(group) | _.isNull(offset.symname))
        return null;

    var handles = [];
    var offsetHandle = doc[group][offset]; // pick IndexGroup.IndexOffset

    _.each(offsetHandle.symname, function (element) {
        handles.push(exports.adsHandle(doc, group, element));
    });

    debug('adsHandles(doc', group, ',', offset, ') returns', JSON.stringify(handles, 0, 2));
    return handles;
}

exports.connect = function connect(doc, operations) {
    var options = exports.adsOptions(doc);
   // debug('calling ads.connect with options ', JSON.stringify(options, 0, 2));
    var client = ads.connect(options, operations);

    // attribute client with properties of this app
    client.logicalStorage = [];
    client.targetName = doc.targetName; // transfer target name to identify client

    return client;
}


/* not in use, using callbacks rather than promises
exports.connectPromisified = function connectPromisified( doc, operations ) {
    return new Promise(
        function (resolve, reject) {
            var options = exports.adsOptions(doc);
            client = ads.connect(options, operations, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(client);
                        debug('<<<<<<<<<>>>>>> client ',JSON.stringify(client,0,2));
                        //client.targetName = doc.targetName; // transfer target name to identify client
                        return client;
                    }
                });
        });
}
*/

exports.getSymbols = function getSymbols(doc) {
    var options = exports.adsOptions(doc);
    client = ads.connect(options, function () {
        debug('ads.connect  options ', JSON.stringify(options, 0, 2));
        var self = this;
        this.getSymbols(function (err, result) {
            console.log(JSON.stringify(result, 0, 2));
            self.end();
        });
    });

    client.on('error', function (error) {
        console.log(error.stack);
    });
}


exports.readDeviceInfo = function readDeviceInfo(doc) {
    var options = exports.adsOptions(doc);
    client = ads.connect(options, function () {
       // debug('ads.connect  options ', JSON.stringify(options, 0, 2));
        var self = this;
        this.readDeviceInfo(function (err, result) {
            console.log(JSON.stringify(result, 0, 2));
            self.end();
        });
    });

    client.on('error', function (error) {
        console.log(error.stack);
    });
}

exports.notify = function notify(client, doc, group, offset) {
    var handle = exports.adsHandle(doc, group, offset);
    client.notify(handle);
}


exports.validateAdsConfig = function validateAdsConfig( test ) {
    _.each(test.targets, function fieldsFromAds(target) {
        const adsConfig = require('../../../system_json/' + target.adsTarget + '.json');
        _.each(target.adsNotifications, function mapPropname(symName) {

            var adsElement = adsConfig[exports.handleGroup(symName)][exports.handleIndex(symName)];
            debug(symName,'  bytelength ',adsElement.bytelength.length, ' propname.length ',adsElement.propname.length);
        });
    });
}

function adsToInfluxConversion( type, value ) {
   if ( type == 'BOOL') {
       return value ? true : false;
   }
   else {
      return value;
   }
}

exports.marshalObjectSamples = function marshalObjectSamples(handle) {
    // pure syncronous function but promised to prevent re-entrance on client's notification event
    return new Promise((resolve, reject, notify) => {
        var samples = {};
        //console.log(JSON.stringify(handle,0,2));
        debug('marshalObjectSamples handle size :', handle.propname.length);
        try {
            // precondition: response has been added to handle via the ads layer
            if (_.size(handle.bytelength) > 1) {
                for (var i = 0; i < handle.propname.length; i++) {
                    samples[handle.propname[i]] = adsToInfluxConversion(handle.bytelength[i].name, handle[handle.propname[i]]);
                }
                //debug('marshalObjectSamples array :', handle.symname, ' = ', JSON.stringify(samples, 0, 2));
            } else {
                samples[handle.propname[0]] = handle[handle.propname[0]];
                //debug('marshalObjectSamples scalar :', handle.propname[0], ' = ', handle[handle.propname[0]]);
            }
            resolve(samples);
        } catch (err) {
            reject(new Error(err));
        }
    });
}



// doc is INOUT with OUT specified by propname i.e. doc.offset
exports.read = function read( client, doc, group, offset, samples ) {
    var handle = exports.adsHandle(doc, group, offset);
    var maxTimeOuts = 0;
    var noTimeOuts = 0;
    // debug('calling ads.read : ', JSON.stringify(handle, 0, 2));

    do {
        client.read(handle, function ( err, resp ) {
            if (_.isUndefined(resp)) {
                console.log('Error on read:', err);
                maxTimeOuts = 2;
            } else {

    //todo      exports.marshalSamples( resp, samples );

                debug('read samples ',JSON.stringify(samples,0,2));
            }
        });
    } while (noTimeOuts < maxTimeOuts)

    client.on('timeout', function () {
        debug('!! read timeout:  retrying');
        maxTimeOuts = 2;
        noTimeOuts++;
    });
}




// not in use, needs work
/*
exports.multiRead = function multiRead( doc, group, offset ) {
    var options = exports.adsOptions(doc);
    var handles = exports.adsHandles(doc, group, offset);

    debug('ads.multiRead handles ', JSON.stringify(handles, 0, 2));
    var _this = this;
    this.multiRead(handles, function (err, out) {

        if (_.isUndefined(out))
            console.log('multiRead error ', err);

        debug('ads.multiRead out ', JSON.stringify(out, 0, 2));
        //result is the myHandle object with the new properties filled in
        //console.log(out[offset]);
        console.log(out);
        //All handles will be released automaticly here
        _this.end();
    });
}
*/