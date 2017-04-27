var config = require('../../../system_json/servicesConfig.json'),
    _ = require('underscore-contrib'),
    ads = require('io_ads'),
    debug = require('debug')('instrument');


// this is the module with logic for managmenet of the instrumentation and storage

exports.testToConsole = function testToConsole(test) {
    console.log('Test Configuration'.info, ': ', '\n\r\tmeasurement'.info, ': ', test.measurement.input);
    console.log('\ttags'.info, ': ');
    var tags = _.pairs( test.tags );
    _.each( tags, function(tag) {
        var tagKey = String(tag[0]);
        var tagValue = String(tag[1]);
        var pad = String("                 ").slice(0, -tagKey.length);
        console.log('\t    ', tagKey.info, pad, ':', tagValue.data);
    })

    _.each(test.targets, function (target) {

        const adsConfig = require('../../../system_json/' + target.adsTarget + '.json');

        console.log('\tInstrumentation'.info, ':', '\r\n\t\ttarget'.info, ' : ', target.adsTarget.input);

        if (!_.isEmpty(target.adsNotifications)) {
            console.log('\t\t   notifications'.info, ':');
            _.each( target.adsNotifications, function ( symname ) {
                console.log('\t\t                    ', symname.data);
            })
        }
        if (!_.isEmpty(target.adsSamples)) {
            console.log('\t\tpolling rate'.info, ' ', adsConfig.adsTarget.pollRate.data, ' : ');
            _.each(target.adsSamples, function (symname) {
                console.log('\t\t                      ', symname.data);
            })
        }

        _.each(target.dbTargets, function (dbTarget) {
            console.log('\t\t   storage'.info, ':',dbTarget.data);
            const dbConfig = require('../../../system_json/' + dbTarget + '.json');
            console.log('\t\t     database'.info, ' : ', dbConfig.dbTarget.type.input, '\r\n\t\t     db'.info, '       : ', dbConfig.dbTarget.database.input);
        })
    })
}

exports.validateSampleCount = function validateSampleCount( lastSamples, currentSamples, delta ){
    // precondition is that lastSamples['sampleCount'] is initialized to zero
    let clockDiff = currentSamples['sampleCount'] - lastSamples['sampleCount'];
    if (clockDiff != delta) {
        console.log('current sampleCount ',currentSamples['sampleCount'],'  last sampleCount ',lastSamples['sampleCount']);
    }
}
/*

// this converts the ads propname array to the influx field object
exports.influxFields = function influxFields( test ) {
    var field = {};

    _.each(test.adsTargets, function adsSetup(adsTarget) {

    debug('<<<<<<',JSON.stringify(adsTarget,0,2));

    const adsConfig = require('../../system_json/'+adsTarget+'.json');

    _.map(adsConfig[exports.handleGroup(symName)][exports.handleIndex(symName)].propname,
          function mapToField(elem) {
        field[elem] = 0;
    });
    return field;

    });
}
*/

