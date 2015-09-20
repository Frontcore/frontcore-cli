(function() {
	'use strict';

	/**
	 * Requires a 3rd party utility functions;
	 */
	var io = require('socket.io-client');

	/**
	 * Requires a frontcore-cli utility functions;
	 * @requires msg:./lib/message.js
	 */
	var msg = require('./message');

	/**
	 * Make a socket.io server connection and send config meta info to frontcore server.
	 * @module ./lib/send.js
	 * @access public
	 * @param {string} projPath - location of the project path where frontcore.json file will get created.
	 */
	exports.config = function(projPath) {
		var conf = require(projPath);
		var socket = io.connect('http://' + conf.service.address + ':' + conf.service.port);

		socket.on('connect', function() {
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

		socket.on("disconnect", function() {
			msg.info(" frontcore server got disconnected! Terminating");
			process.exit(0);
		});
	};

})();