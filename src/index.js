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
	 * @requires send:./lib/send.js
	 */
	var msg = require('./message'),
		check = require('./validate'),
		prompt = require('./prompt'),
		send = require('./send');

	/**
	 * Main frontcore-cli function; check arguments and redirects
	 * @module ./lib/index.js
	 * @access public
	 * @param {object} options - set and pass initial options
	 */
	module.exports = function(options) {

		var isExit = false,
			isDarwin = true,
			usercmd = (process.argv[2]) ? process.argv[2].toLowerCase() : false,
			useropt = (process.argv[3]) ? process.argv[3].toLowerCase() : false,
			cmdopt = (process.argv[4]) ? process.argv[4].toLowerCase() : false;

		options = (options) ? options : {};

		if (os.type().toLowerCase() === 'linux' || os.type().toLowerCase() === 'Windows_NT') {
			isDarwin = false;
		}

		/**
		 *	Arguments are case insensitive
		 *	process.argv[0] = node
		 *	process.argv[1] = filename (./bin/frontcore)
		 *	process.argv[2]/usercmd = currently only "init" and "help" arguments are allowed
		 *	process.argv[3]/useropt = has below mapping and is only valid if process.argv[2] is specified
		 *	"init" - Can specify project directory path, default will be current directory from where frontcore command is executed [.]
		 *	"load" - Send the generated frontcore.json configuration to frontcore server
		 */
		if (process.argv.length < 3) {
			msg.error('Missing arguments');
			msg.help();
			isExit = true;
		} else {
			switch (usercmd) {
				case 'help':
					msg.help();
					isExit = true;
					break;

				case 'init':
					if (useropt && (!cmdopt || cmdopt)) {
						if (check.isCmdMapped(usercmd, useropt)) {
							if (cmdopt) {
								if (check.isPathExist(path.normalize(cmdopt))) {
									if (check.isDir(path.normalize(cmdopt))) {
										options.projPath = path.normalize(cmdopt);
									} else {
										msg.error('Project path should be a directory, Please try again with a valid directory path');
										isExit = true;
									}
								} else {
									msg.error('Project path seems to be incorrect, Please try again with a valid path');
									isExit = true;
								}
							} else {
								msg.error('No project directory path specified with ' + useropt);
								isExit = true;
							}
						} else {
							msg.error('`init` command takes either no arguments or -p <path> or --path <path>\n Please try again with valid arguments');
							isExit = true;
						}
					} else {
						options.projPath = process.env.PWD;
					}

					if (!isExit) {
						msg.info([
							'\n Welcome to ' + PRODUCT.name + ' v' + PRODUCT.version,
							'',
							' This utility will ask you bunch of questions to create a frontcore.json configuration file.',
							' It only covers the most common items, and tries to guess sensible defaults.',
							'',
							' For more info visit ' + PRODUCT.repository.url,
							' Press `' + ((isDarwin) ? 'CMD+C' : 'Ctrl+C') + '` at any time to quit.\n'
						].join('\n'));

						prompt.init(options);
					}
					break;

				case 'load':
					if (useropt && (!cmdopt || cmdopt)) {
						if (check.isCmdMapped(usercmd, useropt)) {
							if (cmdopt) {
								if (check.isPathExist(path.normalize(cmdopt))) {
									if (check.isFile(path.normalize(cmdopt))) {
										send.config(path.normalize(cmdopt));
									} else {
										msg.error('Project path should be a file, Please try again with a valid frontcore.json file path');
									}
								} else {
									msg.error('Path to frontcore.json seems to be incorrect, Please try again with a valid path');
								}
							} else {
								msg.error('No project directory path specified with ' + useropt);
								isExit = true;
							}
						} else {
							msg.error('`load` command takes either no arguments or -l <path> or --load <path>\n Please try again with valid arguments');
							isExit = true;
						}
					} else {
						if (check.isPathExist(process.env.PWD + '/frontcore.json')) {
							send.config(process.env.PWD + '/frontcore.json');
						} else {
							msg.error("Couldn't find a frontcore.json configuration file in your current directory");
							msg.info(" Please run `frontcore init` command to generate frontcore.json file or `frontcore help`");
						}
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
	};

}());
