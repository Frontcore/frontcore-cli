(function() {
	'use strict';

	/**
	 * Requires a in-built utility functions;
	 */
	var fs = require('fs');

	/**
	 * Check if the project path exist
	 * @module ./lib/validate.js
	 * @access public
	 * @param {string} projPath - location of the project path where frontcore.json file will get created.
	 */
	exports.isPathExist = function(projPath) {
		return fs.existsSync(projPath);
	};

	/**
	 * Check if the project path is directory
	 * @module ./lib/validate.js
	 * @access public
	 * @param {string} projPath - location of the project path where frontcore.json file will get created.
	 */
	exports.isDir = function(projPath) {
		var stats = fs.statSync(projPath);
		return stats.isDirectory();
	};

})();