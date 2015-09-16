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
			 * Run jsonlint on JavaScript files
			 */
			jsonlint: {
				files: '*.json'
			},

			/**
			 * Run Jshint on JavaScript files
			 */
			jshint: {
				all: [
					'Gruntfile.js',
					'lib/**/*.js'
				],
				options: {
					jshintrc: '.jshintrc'
				}
			},

			/**
			 * Run JSCS check on JavaScript files
			 */
			jscs: {
				options: {
					config: '.jscsrc'
				},
				src: [
					'Gruntfile.js',
					'lib/**/*.js'
				]
			}
		});

		/**
		 * Load grunt plugins (npm)
		 */
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-jscs');
		grunt.loadNpmTasks('grunt-jsonlint');

		/**
		 * Set `default` task
		 */
		grunt.registerTask('default', ['jsonlint', 'jshint', 'jscs']);

		/**
		 * Set `lint` task
		 */
		grunt.registerTask('lintjs', ['jsonlint', 'jshint', 'jscs']);

	};
})();