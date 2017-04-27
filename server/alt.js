let path = require('path');
let _ = require('underscore-contrib');
let timer = require('nanotimer');

let testProcedures = require(__dirname + '/json/lorc_examples/testProcedures.json');






_.each(testProcedures.testProcedures, function (procedure) {
    _.each(procedure.test, function (test) {

        console.log('Preconditions'.toUpperCase());
        runAssertions(test.preconditions);
        console.log('Operations'.toUpperCase())
        runOperations(test.operations);
        console.log('postconditions'.toUpperCase())
        runAssertions(test.postconditions);

    });
})


function runAssertions(conditions) {

    _.each(conditions, function (preCon) {
        console.log('wait: ' + preCon.time);
        console.log('name: ' + preCon.name);
        console.log('args: ' + preCon.args);
        console.log('expect: ' + preCon.expect);
        console.log('logic: ' + preCon.logic);
        console.log('inReport: ' + preCon.inReport);
        console.log('  ');
    })
}

function runOperations(operations) {
    _.each(operations, function (operation) {
        console.log('time: ' + operation.time);
        console.log('name: ' + operation.name);
        console.log('args: ' + operation.args);
        console.log('message: ' + operation.reportMessage);
        console.log('target: ' + operation.target);
        console.log('inReport: ' + operation.inReport);
        console.log(' ');
    })
}
