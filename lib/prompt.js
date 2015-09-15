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
	 */
	var set = require('./set.js'),
		fsops = require('./fsops.js'),
		msg = require('./message.js');

	/**
	 * Execute inquirer prompt
	 * @access private
	 * @param {object} options - set and pass initial options
	 */
	var _prompt = function(questionsStack, callbacks) {
		inquirer.prompt(questionsStack, callbacks);
	};

	/**
	 * Initialize inquirer prompt
	 * @module ./lib/prompt.js
	 * @access public
	 * @param {object} options - set and pass initial options
	 */
	exports.init = function(options) {

		_prompt([{
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
					return '0.0.1'
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

			// TODO: Check is file already exist.
			if (fsops.writeJSONFile(answers, options.projPath + '/frontcore.json')) {
				msg.info('\n\tConfiguration file got created : frontcore.json\n');
			}

		});
	};

})();