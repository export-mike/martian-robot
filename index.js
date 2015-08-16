'use strict';

var map = require('./map');
var Robot = require('./robot');

var internals = {
  inputLines: [],
};

module.exports = internals.Mars = function(input){
  internals.inputLines = input.split('\n');

  internals.setMapSize();
  
  var output = '';

  var i = 0;
  for (i = 0; i < internals.inputLines.length; i++) {
    var line = internals.inputLines[i];
    if (line !== '' && /\s/g.test(line)) {
      var values = line.split(' ');
      var commandsForRobot = internals.inputLines[i + 1];
      var robot = new Robot({x:parseInt(values[0]), y:parseInt(values[1]), facing:values[2]});
      
      output += robot.command(commandsForRobot) + '\n';
    }
  }

  return output;
};


internals.setMapSize = function(){
  var values;
  values = internals.inputLines[0].split(' ');
  map.setSize(parseInt(values[0]), parseInt(values[1]));
  internals.inputLines.splice(0, 1);
};