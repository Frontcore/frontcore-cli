(function() {
	'use strict';

	/**
	 * Requires a in-built utility functions;
	 */
	var path = require('path');
	var fs = require('fs');

	/**
	 * Requires a 3rd party utility functions;
	 */
	var jsonfile = require('jsonfile');

	/**
	 * Write JS object to JSON file
	 * @module ./lib/fsops.js
	 * @access public
	 * @param {object} answers - answer object generated with inquirer prompt
	 * @param {string} projPath - location of the project path where frontcore.json file will get created.
	 */
	exports.writeJSONFile = function(answers, projPath) {
		jsonfile.spaces = 4;
		jsonfile.writeFileSync(projPath, answers);

		return true;
	};

	/**
	 * Read package.json JSON file and assume defaults choices
	 * @module ./lib/fsops.js
	 * @access public
	 * @param {string} file - location of the project path where frontcore.json file will get created with name of the file.
	 */
	exports.getNameFromPackage = function(file) {
		var _requireFile = jsonfile.readFileSync(file);
		return _requireFile.name;
	};

	/**
	 * Read bower.json JSON file and assume defaults choices
	 * @module ./lib/fsops.js
	 * @access public
	 * @param {string} file - location of the project path where frontcore.json file will get created with name of the file.
	 */
	exports.getNameFromBower = function(file) {
		var _requireFile = jsonfile.readFileSync(file);
		return _requireFile.name;
	};

	/**
	 * Check if file exist on given path
	 * @module ./lib/fsops.js
	 * @access public
	 * @param {string} file - location of the project path where frontcore.json file will get created with name of the file.
	 */
	exports.isFileExist = function(file) {
		try {
			fs.openSync(file, 'r');
			return true;
		} catch(error) {
			if (error.code === 'ENOENT') {
				return false;
			} else {
				throw error;
			}
		}
	};

})();
