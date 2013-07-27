/**
 * Created with JetBrains WebStorm.
 * User: erik.seierstad
 * Date: 2013-07-24
 * Time: 00:19
 */
(function (global) {
    "use strict";
	require(["../lib/suncalc/suncalc"], function(util) {
	    //This function is called when scripts/helper/util.js is loaded.
	    //If util.js calls define(), then this function is not fired until
	    //util's dependencies have loaded, and the util argument will hold
	    //the module value for "helper/util".
	});
	// export either as a CommonJS module or a global variable

	var Ra;

	if (typeof exports !== 'undefined') {
		Ra = exports;
	} else {
		Ra = global.Ra = {};
	}

    Ra.position = {};
    Ra.movement = {};
    Ra.orientation = {};

    function positionCallback (pos) {
    	Ra.position = pos;
	}

	function getLocation () {
	  navigator.geolocation.getCurrentPosition(positionCallback);
	}
	
	function motionHandler (event) {
		Ra.movement.x = event.accelerationIncludingGravity.x;
		Ra.movement.y = event.accelerationIncludingGravity.y;
		Ra.movement.z = event.accelerationIncludingGravity.z;

	}

	function orientationHandler (event) {
	    var absolute, alpha, beta, gamma;
	    absolute = event.absolute;
	    alpha = event.alpha;
	    beta = event.beta;
	    gamma = event.gamma;

	    Ra.orientation = event;
	}

	var orientationchangelistener = function (event) {
		Ra.orientation.screen = (screen.orientation || screen.webkitOrientation || screen.mozOrientation || window.orientation);
	};

	Ra.stringifyObject = function (o) {
	  var p, s = ''; 
	  for (p in o) {
	  	if (o.hasOwnProperty(p)) {
	  		if (typeof o[p] !== 'object' || o[p] === null) {
	  			s += p + ': ' + o[p] + '\n';
	  		} else {
	  			s += '\n' + p + ': \n' + this.stringifyObject(o[p]) + '\n';
	  		}
	  	}
	  }
	  return s;
	};

	global.addEventListener('devicemotion', motionHandler, false);
	global.addEventListener('deviceorientation', orientationHandler, false);
	global.addEventListener('orientationchange', orientationchangelistener, false);
	global.addEventListener('load', getLocation, false);


}(this));
