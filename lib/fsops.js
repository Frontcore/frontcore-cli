(function() {
	'use strict';

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

})();