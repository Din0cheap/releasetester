
let mocha = require('mocha'),
    chai = require('chai'),
    assert = chai.assert;


const
    // src functions
    Promise = require('bluebird'),
    //adsClient = require('./ads'),
    //dbClient = require('./db'),
    //instrument = require('./instrument'),

    // src objects
    testPlan = require('../json/lorc_examples/testPlan.json'),
    testProcedures = require('../json/lorc_examples/testProcedures.json'),

    // modules
    _ = require('underscore-contrib'),
    timer = require('nanotimer'),
    express = require('express'),
    http = require('http'),
    app = express()


_.each(testProcedures.testProcedures, function (procedure) {
    describe(procedure.name, () => {
        _.each(procedure.test, function (test) {
            describe('test', () => {

                // Assert preconditions
                runAssertions(test.preconditions);

                //Run operations
                runOperations(test.operations);

                // Assert preconditions
                runAssertions(test.postconditions);

            });
        });
    })
});


function runAssertions(conditions) {

    _.each(conditions, function (cond) {

        // Get value from plc
        let value = cond.expect.value

        if (cond.inReport) {
            it(cond.reportMessage, function () {
                getAssertion(cond.logic, cond.expect.value, cond.expect.value);
            });
        }
    })
}

function runOperations(operations) {
    _.each(operations, function (operation) {

        // Run Operation

    })
}

/**
 * 
 * @param {*} logic 
 * @param {*} val 
 * @param {*} exp 
 * @param {*} val2 
 * @param {number} delta 
 * @param {string} message 
 */
function getAssertion(logic, val, exp, exp2 = undefined, val2 = undefined, delta = undefined, message = undefined) {

    if (logic == 'assert') {
        assert.assert(val, message);
    }
    else if (logic == 'isOk') {
        assert.isOk(val, message);
    }
    else if (logic == 'isNotOk') {
        assert.isNotOk(val, message);
    }
    else if (logic == 'equal') {
        assert.equal(val, exp, message);
    }
    else if (logic == 'notEqual') {
        assert.notEqual(val, exp, message);
    }
    else if (logic == 'strictEqual') {
        assert.strictEqual(val, exp, message);
    }
    else if (logic == 'notStrictEqual') {
        assert.notStrictEqual(val, exp, message);
    }
    else if (logic == 'deepEqual') {
        assert.deepEqual(val, exp, message);
    }
    else if (logic == 'notDeepEqual') {
        assert.notDeepEqual(val, exp, message);
    }
    else if (logic == 'isAbove') {
        assert.isAbove(val, exp, message);
    }
    else if (logic == 'isAtLeast') {
        assert.isAtLeast(val, exp, message);
    }
    else if (logic == 'isBelow') {
        assert.isBelow(val, exp, message);
    }
    else if (logic == 'isAtMost') {
        assert.isAtMost(val, exp, message);
    }
    else if (logic == 'isTrue') {
        assert.isTrue(val, message);
    }
    else if (logic == 'isNotTrue') {
        assert.isNotTrue(val, message);
    }
    else if (logic == 'isFalse') {
        assert.isFalse(val, message);
    }
    else if (logic == 'isNotFalse') {
        assert.isNotFalse(val, message);
    }
    else if (logic == 'isNull') {
        assert.isNull(val, message);
    }
    else if (logic == 'isNotNull') {
        assert.isNotNull(val, message);
    }
    else if (logic == 'isNaN') {
        assert.isNaN(val, message);
    }
    else if (logic == 'isNotNaN') {
        assert.isNotNaN(val, message);
    }
    else if (logic == 'isUndefined') {
        assert.isUndefined(val, message);
    }
    else if (logic == 'isDefined') {
        assert.isDefined(val, message);
    }
    else if (logic == 'isFunction') {
        assert.isFunction(val, message);
    }
    else if (logic == 'isNotFunction') {
        assert.isNotFunction(val, message);
    }
    else if (logic == 'isObject') {
        assert.isObject(val, message);
    }
    else if (logic == 'isNotObject') {
        assert.isNotObject(val, message);
    }
    else if (logic == 'isArray') {
        assert.isArray(val, message);
    }
    else if (logic == 'isNotArray') {
        assert.isNotArray(val, message);
    }
    else if (logic == 'isString') {
        assert.isString(val, message);
    }
    else if (logic == 'isNotString') {
        assert.isNotString(val, message);
    }
    else if (logic == 'isNumber') {
        assert.isNumber(val, message);
    }
    else if (logic == 'isNotNumber') {
        assert.isNotNumber(val, message);
    }
    else if (logic == 'isBoolean') {
        assert.isBoolean(val, message);
    }
    else if (logic == 'isNotBoolean') {
        assert.isNotBoolean(val, message);
    }
    else if (logic == 'typeOf') {
        assert.typeOf(val, exp, message);
    }
    else if (logic == 'notTypeOf') {
        assert.notTypeOf(val, exp, message);
    }
    else if (logic == 'instanceOf') {
        assert.instanceOf(val, exp, message);
    }
    else if (logic == 'notInstanceOf') {
        assert.notInstanceOf(val, exp, message);
    }
    else if (logic == 'include') {
        assert.include(val, exp, message);
    }
    else if (logic == 'notInclude') {
        assert.notInclude(val, exp, message);
    }
    else if (logic == 'match') {
        assert.match(val, exp, message);
    }
    else if (logic == 'notMatch') {
        assert.notMatch(val, exp, message);
    }
    else if (logic == 'property') {
        assert.property(val, exp, message);
    }
    else if (logic == 'notProperty') {
        assert.notProperty(val, exp, message);
    }
    else if (logic == 'deepProperty') {
        assert.deepProperty(val, exp, message);
    }
    else if (logic == 'notDeepProperty') {
        assert.notDeepProperty(val, exp, message);
    }
    else if (logic == 'propertyVal') {
        assert.propertyVal(val, exp, exp2, message);
    }
    else if (logic == 'propertyNotVal') {
        assert.propertyNotVal(val, exp, exp2, message);
    }
    else if (logic == 'deepPropertyVal') {
        assert.deepPropertyVal(val, exp, exp2, message);
    }
    else if (logic == 'deepPropertyNotVal') {
        assert.deepPropertyNotVal(val, exp, exp2, message);
    }
    else if (logic == 'lengthOf') {
        assert.lengthOf(val, exp, message);
    }
    else if (logic == 'throws') {
        assert.throws(val, message);
    }
    else if (logic == 'doesNotThrow') {
        assert.doesNotThrow(val, message);
    }
    else if (logic == 'operator') {
        assert.operator(val, exp, val2, message);
    }
    else if (logic == 'closeTo') {
        assert.closeTo(val, exp, delta, message);
    }
    else if (logic == 'approximately') {
        assert.approximately(val, exp, delta, message);
    }
    else if (logic == 'sameMembers') {
        assert.sameMembers(val, exp, message);
    }
    else if (logic == 'sameDeepMembers') {
        assert.sameDeepMembers(val, exp, message);
    }
    else if (logic == 'includeMembers') {
        assert.includeMembers(val, exp, message);
    }
    else if (logic == 'includeDeepMembers') {
        assert.includeDeepMembers(val, exp, message);
    }
    else if (logic == 'oneOf') {
        assert.oneOf(val, exp, message);
    }
    else {
        assert.fail(val, exp, 'Test undefined or invalid: logic="' + logic + '"');
    }

    /* 
    Unimplemented assertions
 
    if (logic == 'changes') {
        assert.changes(val, exp, message);
    }
    if (logic == 'doesNotChange') {
        assert.doesNotChange(val, exp, property, message);
    }
    if (logic == 'increases') {
        assert.increases(val, exp, message);
    }
    if (logic == 'doesNotIncrease') {
        assert.doesNotIncrease(val, exp,,message);
    }
    if (logic == 'decreases') {
        assert.decreases(val, exp);
    }
    if (logic == 'doesNotDecrease') {
        assert.doesNotDecrease(,);
    }
    if (logic == 'ifError') {
        assert.ifError(val, message);
    }
    if (logic == 'isExtensible') {
        assert.isExtensible(val, message);
    }
    if (logic == 'isNotExtensible') {
        assert.isNotExtensible(val, message);
    }
    if (logic == 'isSealed') {
        assert.isSealed(val, message);
    }
    if (logic == 'isNotSealed') {
        assert.isNotSealed(val, message);
    }
    if (logic == 'isFrozen') {
        assert.isFrozen(val, message);
    }
    if (logic == 'isNotFrozen') {
        assert.isNotFrozen(val, message);
    }*/

}

