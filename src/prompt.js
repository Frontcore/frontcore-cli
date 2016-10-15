(function() {
	'use strict';

	/**
	 * Requires a in-built utility functions;
	 */
	var path = require('path');

	/**
	 * Requires a 3rd party utility functions;
	 */
	var inquirer = require('inquirer');

	/**
	 * Requires a frontcore-cli utility functions;
	 * @requires set:./lib/set.js
	 * @requires fsops:./lib/fsops.js
	 * @requires msg:./lib/message.js
	 * @requires send:./lib/send.js
	 */
	var set = require('./set');
	var	fsops = require('./fsops');
	var msg = require('./message');

	/**
	 * Execute inquirer prompt
	 * @access private
	 * @param {object} questionsStack - array of questions with respected types
	 * @param {function} callback - callback function gets executed once interactive is completed
	 */
	exports.prompt = function(questionsStack, callback) {
		inquirer.prompt(questionsStack, callback);
	};

	/**
	 * Initialize inquirer prompt
	 * @module ./lib/prompt.js
	 * @access public
	 * @param {object} options - set and pass initial options
	 */
	exports.init = function(options) {

		options = (options) ? options : {};

		var _PWD = process.env.PWD;
		var _assumedProjName = path.basename(_PWD);

		/**
		 * Check if package.json file exist on root directory
		 */
		if (!fsops.isFileExist(path.join(_PWD, 'package.json'))) {
			console.log('\n package.json does not exist on root directory.');

			/**
			 * If package.json not found the check if bower.json file exist on root directory
			 */
			if (!fsops.isFileExist(path.join(_PWD, 'bower.json'))) {
				console.log('\n bower.json does not exist on root directory.\n');
			} else {
				_assumedProjName = fsops.getNameFromBower(path.join(_PWD, 'bower.json'));
			}
		} else {
			_assumedProjName = fsops.getNameFromPackage(path.join(_PWD, 'package.json'));
		}

		this.prompt([{
			type: 'input',
			name: 'name',
			message: `What is your project name? (default: ${_assumedProjName})`,
			filter: function(val) {
				if (val === '') {
					val = path.basename(_PWD);
				}
				return val;
			}
		}, {
			type: 'input',
			name: 'version',
			message: 'What is your project version? (default: 0.0.1)',
			filter: function(val) {
				if (val === '') {
					return '0.0.1';
				}
				return val;
			}
		}, {
			type: 'input',
			name: 'description',
			message: 'What is your project description?',
			filterr: function(val) {
				if(val === '') {
					return 'N/A';
				}
				return val;
			}
		}, {
			type: 'checkbox',
			name: "languages",
			message: 'On what all you want to perform analysis? (default: All)',
			choices: [
				'HTML',
				'CSS',
				'JavaScript'
			]
		}], function(answers) {
			answers.directory = {};

			if (answers.languages.length) {
				for (var i = 0; i < answers.languages.length; i++) {
					if (answers.languages[i] === 'HTML') {
						set.HTMLDir(answers);
					}

					if (answers.languages[i] === 'CSS') {
						set.CSSDir(answers);
					}

					if (answers.languages[i] === 'JavaScript') {
						set.JSDir(answers);
					}
				}
			} else {
				answers.languages = ['HTML', 'CSS', 'JavaScript'];

				set.HTMLDir(answers);
				set.CSSDir(answers);
				set.JSDir(answers);
			}

			answers.location = options.projPath;

			if (fsops.writeJSONFile(answers, options.projPath + '/frontcore.json')) {
				msg.info('\n\tConfiguration file got created : frontcore.json\n');
			}

		});
	};

})();
