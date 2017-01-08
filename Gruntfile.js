(function() {

	'use strict';

	/**
	 * Export grunt registered task
	 * @module ./Gruntfile.js
	 * @access public
	 * @param {object} grunt - default initial grunt objects
	 */
	module.exports = function(grunt) {

		/**
		 * Initialize grunt initial configuration
		 */
		grunt.initConfig({
			/**
			 * Run unit tests
			 */
			nodeunit: {
				tests: ['test/test-*.js']
			}
		});

		/**
		 * Load grunt plugins (npm)
		 */
		grunt.loadNpmTasks('grunt-contrib-nodeunit');

		/**
		 * Set `default` task
		 */
		grunt.registerTask('default', ['nodeunit']);
	};
})();
