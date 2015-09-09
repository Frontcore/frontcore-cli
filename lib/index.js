(function() {
	'use strict';

	var path = require('path'),
		inquirer = require('inquirer');

	var init = function(options) {

		inquirer.prompt([{
			type: 'input',
			name: 'projectname',
			message: 'What is your project name? (default: Current directory name)',
			filter: function(val) {
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
			name: "language",
			message: 'On what all you want to perform analysis? (default: All)',
			choices: [
				'HTML',
				'CSS',
				'JavaScript'
			],
			filter: function(val) {
				console.log(val);

				return val;
			}
		}, {
			type: 'input',
			name: "dirpath",
			message: 'Please set path?',
			filter: function(val) {
				console.log(val);

				return val;
			},
			when: function(prevAnswer) {
				var hasHTML = true,
					hasCSS = true,
					hasJS = true;
					
				if (prevAnswer.language.length) {
					for (var i = 0; i < prevAnswer.language.length; i++) {
						if (prevAnswer.language[i] !== 'HTML') {
							hasHTML = false;
						}

						if (prevAnswer.language[i] !== 'CSS') {
							hasCSS = false;
						}

						if (prevAnswer.language[i] !== 'JavaScript') {
							hasJS = false;
						}
					}
				}

				return true;
			}
		}], function(answers) {
			console.log(JSON.stringify(answers));
			// object to json file conversion
		});
	};

	module.exports = init;

}());