var chai = require('chai')

var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;

describe('Array',function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(-1,[1,2,3].indexOf(4));
        });
    });
});