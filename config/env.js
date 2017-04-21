'use strict';

module.exports = function () {
     process.argv.forEach( function( v, index ) {
	    
	    if( index > 1 ) {
	        process.env.NODE_ENV = v;
	    }
	});
};
