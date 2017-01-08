(function() {
	'use strict';

	/**
	 * Requires a in-built utility functions;
	 */
	const fs = require('fs');

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
	 * Check if the path is directory
	 * @module ./lib/validate.js
	 * @access public
	 * @param {string} projPath - location of the project path where frontcore.json file will get created.
	 */
	exports.isDir = function(projPath) {
		const stats = fs.statSync(projPath);
		return stats.isDirectory();
	};

	/**
	 * Check if the path is file
	 * @module ./lib/validate.js
	 * @access public
	 * @param {string} projPath - location of the project path where frontcore.json file will get created.
	 */
	exports.isFile = function(projPath) {
		const stats = fs.statSync(projPath);
		return stats.isFile();
	};

	/**
	 * Validate if command and options are mapped; init => -p | --path, load => -l | --load
	 * @module ./lib/validate.js
	 * @access public
	 * @param {string} cmd - command
	 * @param {string} option - option
	 */
	exports.isCmdMapped = function(cmd, option) {
		let isMapped = false;

		switch (cmd) {
			case 'init':
				if (option === '--path' || option === '-p') {
					isMapped = true;
				}
				break;

			case 'load':
				if (option === '--load' || option === '-l') {
					isMapped = true;
				}
				break;

			default:
				isMapped = false;
				break;
		}

		return isMapped;
	};

})();
