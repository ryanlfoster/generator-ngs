/*jshint unused: false, jquery: true, expr: true*/
/*global $: true, fixtures:true, describe:true, it:true, chai:true, before, after, beforeEach, afterEach, sinon, expect */
'use strict';

var chai = require('chai'),
    should = chai.should();

describe('The sample test', function () {
    it('return true as a string', function(){
        var s = 'Yes, I am a string';
        s.should.be.a('string');
    });
});
