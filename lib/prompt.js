(function() {
	'use strict';

	var path = require('path');
	var inquirer = require('inquirer');

	var set = require('./set.js'),
		fsops = require('./fsops.js'),
		msg = require('./message.js');

	var _prompt = function(questionsStack, callbacks) {
		inquirer.prompt(questionsStack, callbacks);
	};

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