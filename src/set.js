(function() {
	'use strict';

	/**
	 * Check is key exist in object
	 * @access private
	 * @param {object} obj - answer object generated with inquirer prompt
	 * @param {string} key - key that need to be checked
	 */
	let _hasKey = function(obj, key) {
		if (obj.hasOwnProperty(key)) {
			return true;
		}
		return false;
	};

	/**
	 * Set HTML directory object as per htmlhint api
	 * @module ./lib/set.js
	 * @access public
	 * @param {object} answers - answer object generated with inquirer prompt
	 */
	exports.HTMLDir = function(answers) {
		if (_hasKey(answers, 'directory')) {
			answers.directory.html = {};
			answers.directory.html.files = [];
			answers.directory.html.ignore = [];
			answers.directory.html.options = {};
		}

		return answers;
	};

	/**
	 * Set CSS directory object as per csslint api
	 * @module ./lib/set.js
	 * @access public
	 * @param {object} answers - answer object generated with inquirer prompt
	 */
	exports.CSSDir = function(answers) {
		if (_hasKey(answers, 'directory')) {
			answers.directory.css = {};
			answers.directory.css.files = [];
			answers.directory.css.ignore = [];
			answers.directory.css.options = {};
		}

		return answers;
	};

	/**
	 * Set JS directory object as per jshint/eslint api
	 * @module ./lib/set.js
	 * @access public
	 * @param {object} answers - answer object generated with inquirer prompt
	 */
	exports.JSDir = function(answers) {
		if (_hasKey(answers, 'directory')) {
			answers.directory.js = {};
			answers.directory.js.files = [];
			answers.directory.js.ignore = [];
			answers.directory.js.options = {};
		}

		return answers;
	};

})();
