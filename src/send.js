(function() {
	'use strict';

	/**
	 * Requires a in-built utility functions;
	 */
	const os = require('os');

	/**
	 * Requires a 3rd party utility functions;
	 */
	const io = require('socket.io-client');

	/**
	 * Requires a constants utility functions;
	 */
	const PRODUCT = require('../package.json');

	/**
	 * Requires a frontcore-cli utility functions;
	 * @requires msg:./lib/message.js
	 */
	const msg = require('./message');

	let isDarwin = true;
	if (os.type().toLowerCase() === 'linux' || os.type().toLowerCase() === 'Windows_NT') {
		isDarwin = false;
	}

	/**
	 * Make a socket.io server connection and send config meta info to frontcore server.
	 * @module ./lib/send.js
	 * @access public
	 * @param {string} projPath - location of the project path where frontcore.json file will get created.
	 */
	exports.config = function(projPath) {
		let conf = require(projPath);
		let socket = io.connect('http://' + conf.service.address + ':' + conf.service.port, {
			'reconnectionAttempts': 3
		});

		socket.on('connect', function() {

			msg.info([
				'\n ' + PRODUCT.parent.product + ' v' + PRODUCT.parent.version + ' got connected',
				'',
				' Press `' + ((isDarwin) ? 'CMD+C' : 'Ctrl+C') + '` at any time to disconnect.\n'
			].join('\n'));

			socket.on('isConfReady', function(res) {
				if (res.isReady) {
					socket.emit('pushConf', {
						'client': {
							'conf': conf,
							'projPath': projPath
						}
					});
				}
			});
		});

		socket.on('disconnect', function() {
			msg.info(' Info: ' + PRODUCT.parent.product + ' v' + PRODUCT.parent.version + ' server got disconnected');
			process.exit(0);
		});

		socket.on('connect_error', function() {
			msg.error(PRODUCT.parent.product + ' v' + PRODUCT.parent.version + ' server got disconnected');
		});

	};

})();
