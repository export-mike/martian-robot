'use strict';

var map = {width:0, height:0};

module.exports.setSize = function(width, height){
	if(width > 50 || height > 50){
		throw Error('Given map size is too large. MAX = (50,50)');
	}

	map.width = width;
	map.height = height;
};

module.exports.getSize = function(){
	return map;
};
