(function() {
	'use strict';

	/**
	 * Requires a in-built utility functions;
	 */
	var path = require('path'),
		os = require('os');

	/**
	 * Requires a constants utility functions;
	 */
	var PRODUCT = require('../package.json');

	/**
	 * Requires a frontcore-cli utility functions;
	 * @requires msg:./lib/message.js
	 * @requires prompt:./lib/prompt.js
	 */
	var msg = require('./message'),
		check = require('./validate'),
		prompt = require('./prompt');

	/**
	 * Main frontcore-cli function; check arguments and redirects
	 * @module ./lib/index.js
	 * @access public
	 * @param {object} options - set and pass initial options
	 */
	module.exports = function(options) {

		var isExit = false,
			isDarwin = true;

		options = (options) ? options : {};

		/**
		 *	Arguments are case insensitive
		 *	process.argv[0] = node
		 *	process.argv[1] = filename (./bin/frontcore)
		 *	process.argv[2] = currently only "init" and "help" arguments are allowed
		 *	process.argv[3] = has below mapping and is only valid if process.argv[2] is specified
		 *	"init" - Can specify project directory path, default will be current directory from where frontcore command is executed [.]
		 */
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
					if (process.argv[3]) {
						if (check.isPathExist(path.normalize(process.argv[3]))) {
							if (check.isDir(path.normalize(process.argv[3]))) {
								options.projPath = path.normalize(process.argv[3]);
							} else {
								msg.error('Project path should be a directory, Please try again with a valid directory path');
								isExit = true;
							}
						} else {
							msg.error('Project path seems to be incorrect, Please try again with a valid path');
							isExit = true;
						}
					} else {
						options.projPath = __dirname;
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
		} else {

			if (os.type().toLowerCase() === 'linux' || os.type().toLowerCase() === 'Windows_NT') {
				isDarwin = false;
			}

			msg.info([
				'\n Welcome to ' + PRODUCT.name + ' v' + PRODUCT.version + ', ' + process.env.USER,
				'',
				' This utility will ask you a bunch of questions to creating a frontcore.json configuration file.',
				' It only covers the most common items, and tries to guess sensible defaults.',
				'',
				' For more info visit ' + PRODUCT.repository.url,
				' Press `' + ((isDarwin) ? 'CMD+C' : 'Ctrl+C') + '` at any time to quit.\n'
			].join('\n'));

			prompt.init(options);
		}

	};

}());