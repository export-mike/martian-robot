'use strict';

var Map = require('./map');

const MAX_COMMAND_LENGTH = 100;

var internals = {};

internals.scents = [];

module.exports = internals.Robot = function(options) {

	this.compass = ['N', 'E', 'S', 'W'];

	this.currentFace = this.compass.indexOf(options.facing);

	this.x = options.x;
	this.y = options.y;

	this.lost = false;

};

internals.Robot.prototype.turnRight = function() {
	this.currentFace++;
	if (this.currentFace > 3) {
		this.currentFace = 0;
	}
};


internals.Robot.prototype.turnLeft = function() {
	this.currentFace--;
	if (this.currentFace < 0) {
		this.currentFace = 3;
	}
};

internals.Robot.prototype.move = function(command) {
	if (command === 'R') {
		return this.turnRight();
	}

	if (command === 'L') {
		return this.turnLeft();
	}

	if (command === 'F') {
		return this.moveForward();
	}
};

internals.Robot.prototype.moveForward = function() {
	var x = this.x,
		y = this.y;

	var face = this.getCurrentFace();

	if (face === 'N') {
		y++;
	} else if (face === 'S') {
		y--;
	} else if (face === 'E') {
		x++;
	} else if (face === 'W') {
		x--;
	}

	if (this.checkScent(x, y)) {
		return;
	} else if (this.isLost(x, y)) {
		this.lost = true;
		internals.scents.push({x:x, y:y});
	} else {
		this.x = x;
		this.y = y;
	}

};

internals.Robot.prototype.isLost = function(x, y) {
	var map = Map.getSize();

	return x > map.width || x < 0 || y > map.height || y < 0;

};

internals.Robot.prototype.checkScent = function(x, y) {
	var scent = internals.scents.filter(function(coord) {
		return coord.x === x && coord.y === y;
	});

	if (scent.length) {
		return true;
	}

	return false;
};

internals.Robot.prototype.getCurrentFace = function() {
	return this.compass[this.currentFace];
};

internals.Robot.prototype.currentCoords = function() {
	return {
		x: this.x,
		y: this.y
	};
};

internals.Robot.prototype.command = function(commands) {
	if (commands) {
		if(commands.length > MAX_COMMAND_LENGTH){
			return console.log('Command length is greater than %s', MAX_COMMAND_LENGTH);
		}
		commands = commands.split('');

		for (var i = 0; i < commands.length; i++) {
			if(!this.lost){
				this.move(commands[i]);
			}
		}
	}

	return this.formatEndPositionForOutput();
};

internals.Robot.prototype.formatEndPositionForOutput = function() {
	var lostPart = this.lost ? ' LOST' : '';
	return this.x + ' ' + this.y + ' ' + this.getCurrentFace() + lostPart;
};
