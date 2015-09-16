(function() {
	'use strict';

	/**
	 * Requires a frontcore-cli utility functions;
	 * @requires set:../lib/set.js
	 */
	var set = require('../lib/set.js');

	/**
	 * Expected JSON objects;
	 */
	var hasHTMLDir = require('./expected/hasHTMLDir.json'),
		hasCSSDir = require('./expected/hasCSSDir.json'),
		hasJSDir = require('./expected/hasJSDir.json'),
		hasNoDir = require('./expected/hasNoDir.json');

	/**
	 * Includes setup, teardown and unit test assertions
	 * @module ./test/test-set.js
	 * @access public
	 */
	module.exports = {

		setUp: function(callback) {
			callback();
		},

		tearDown: function(callback) {
			callback();
		},

		HAS_KEY_TEST: function(test) {
			test.deepEqual(set.HTMLDir(hasHTMLDir), hasHTMLDir);
			test.deepEqual(set.CSSDir(hasCSSDir), hasCSSDir);
			test.deepEqual(set.JSDir(hasJSDir), hasJSDir);

			test.done();
		},

		NO_DIR_KEY_TEST: function(test) {
			test.deepEqual(set.HTMLDir(hasNoDir), hasNoDir);
			test.deepEqual(set.CSSDir(hasNoDir), hasNoDir);
			test.deepEqual(set.JSDir(hasNoDir), hasNoDir);

			test.done();
		}
	};

})();