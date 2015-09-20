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
	var set = require('./set'),
		fsops = require('./fsops'),
		msg = require('./message');

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

		this.prompt([{
			type: 'input',
			name: 'projectname',
			message: 'What is your project name? (default: Current directory name)',
			filter: function(val) {
				if (val === '') {
					val = path.basename(__dirname);
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

			/**
			 * Adds default frontcore server address and port
			 */
			answers.service = {};
			answers.service.address = "localhost";
			answers.service.port = "9000";

			if (fsops.writeJSONFile(answers, options.projPath + '/frontcore.json')) {
				msg.info('\n\tConfiguration file got created : frontcore.json\n');
			}

		});
	};

})();