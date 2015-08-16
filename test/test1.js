'use strict';
var Path = require('path');
var expect = require('chai').expect;
var makeRobots = require('../');

var input = require('fs').readFileSync(Path.join(__dirname,'input/input1.txt'), 'utf-8');
var expected = require('fs').readFileSync(Path.join(__dirname,'expected/expected1.txt'), 'utf-8');

describe('Martian robots', function() {

	it('should match expected1.txt', function() {
		
		var output = makeRobots(input);
		console.log(output);
		expect(expected).to.equal(output);
	});
});