(function() {
	'use strict';

	var path = require('path'),
		inquirer = require('inquirer'),
		jsonfile = require('jsonfile');

	var _prompt = function(questionsStack, callbacks) {
		inquirer.prompt(questionsStack, callbacks);
	};

	var _setHTMLDir = function(answers) {
		if (answers.directory) {
			answers.directory.html = {};
			answers.directory.html.files = [];
			answers.directory.html.ignore = [];
			answers.directory.html.options = {};
		}
	};

	var _setCSSDir = function(answers) {
		if (answers.directory) {
			answers.directory.css = {};
			answers.directory.css.files = [];
			answers.directory.css.ignore = [];
			answers.directory.css.options = {};
		}
	};

	var _setJSDir = function(answers) {
		if (answers.directory) {
			answers.directory.js = {};
			answers.directory.js.files = [];
			answers.directory.js.ignore = [];
			answers.directory.js.options = {};
		}
	};

	var _writeJSONFile = function(answers, projPath) {
		jsonfile.spaces = 4;
		jsonfile.writeFileSync(projPath, answers);
	};

	var init = function(options) {

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
						_setHTMLDir(answers);
					}

					if (answers.languages[i] === 'CSS') {
						_setCSSDir(answers);
					}

					if (answers.languages[i] === 'JavaScript') {
						_setJSDir(answers);
					}
				}
			} else {
				answers.languages = ['HTML', 'CSS', 'JavaScript'];

				_setHTMLDir(answers);
				_setCSSDir(answers);
				_setJSDir(answers);
			}

			_writeJSONFile(answers, __dirname + '/frontcore.json');

		});

	};

	module.exports = init;

}());