(function() {
	'use strict';

	/**
	 * Requires a frontcore-cli utility functions;
	 * @requires fsops:../lib/fsops.js
	 */
	var fsops = require('../lib/fsops.js');

	/**
	 * Expected JSON objects to hold data that are provided to source to generated datafiles;
	 */
	var config_projectname = require('./expected/projectname.json'),
		config_language = require('./expected/language.json'),
		config_directories = require('./expected/directories.json');

	/**
	 * Includes setup, teardown and unit test assertions
	 * @module ./test/test-fsops.js
	 * @access public
	 */
	module.exports = {

		setUp: function(callback) {
			fsops.writeJSONFile(config_projectname, __dirname + '/tmp/config_projectname.json');
			fsops.writeJSONFile(config_language, __dirname + '/tmp/config_language.json');
			fsops.writeJSONFile(config_directories, __dirname + '/tmp/config_directories.json');
			callback();
		},

		tearDown: function(callback) {
			callback();
		},

		GENERATE_CONFIG_FILE_TEST: function(test) {

			test.deepEqual(require('./tmp/config_projectname.json'), config_projectname);
			test.deepEqual(require('./tmp/config_language.json'), config_language);
			test.deepEqual(require('./tmp/config_directories.json'), config_directories);

			test.done();
		}
	};

})();