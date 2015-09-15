(function() {
	'use strict';

	var path = require('path'),
		os = require('os');

	var inquirer = require('inquirer'),
		jsonfile = require('jsonfile');

	var msg = require('./message.js');

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

		return true;
	};

	var main = function(options) {

		/**
		 * Notes: 
		 *	Arguments are case insensitive
		 *	process.argv[0] = node
		 *	process.argv[1] = filename (./bin/frontcore)
		 *	process.argv[2] = currently only "init" and "help" arguments are allowed
		 *	process.argv[3] = has below mapping and is only valid if process.argv[2] is specified
		 *	"init" - Can specify project directory path, default will be current directory from where frontcore command is executed [.]
		 */

		var isExit = false;

		if (process.argv.length < 3) {
			msg.error('missing arguments');
			msg.help();
			isExit = true;
		} else {
			switch (process.argv[2].toLowerCase()) {
				case 'help':
					msg.help();

					isExit = true;
					break;

				case 'init':
					console.log('init executed');

					if (process.argv[3]) {
						// TODO: Override the default
					} else {
						// TODO: Keep the default
					}
					break;

				default:
					msg.error('Unknown command, Please try again');
					msg.help();
					isExit = true;
					break;
			}
		}

		if (isExit) {
			process.exit(0);
		}

		var isDarwin = true;

		if (os.type().toLowerCase() === 'linux' || os.type().toLowerCase() === 'Windows_NT') {
			isDarwin = false;
		}

		console.log([
			'\n Welcome to ' + PRODUCT.name + ' v' + PRODUCT.version + ', ' + process.env.USER,
			'',
			' This utility will ask you a bunch of questions to creating a frontcore.json configuration file.',
			' It only covers the most common items, and tries to guess sensible defaults.',
			'',
			' For more info visit ' + PRODUCT.repository.url,
			' Press `' + ((isDarwin) ? 'CMD+C' : 'Ctrl+C') + '` at any time to quit.\n'
		].join('\n'));

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

			if (_writeJSONFile(answers, __dirname + '/frontcore.json')) {
				console.log("\n\tConfiguration file got created : frontcore.json\n");
			}

		});

	};

	module.exports = main;

}());