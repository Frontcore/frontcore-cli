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
			'jsonlint': {
				files: '*.json'
			},

			/**
			 * Run lint on .travis.yml
			 */
			'travis-lint': {
				files: '.travis.yml'
			},

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
		grunt.loadNpmTasks('grunt-jsonlint');
		grunt.loadNpmTasks('grunt-contrib-nodeunit');
		grunt.loadNpmTasks('grunt-travis-lint');

		/**
		 * Set `default` task
		 */
		grunt.registerTask('default', ['jsonlint', 'nodeunit']);

		/**
		 * Set `lintbuild` task
		 */
		grunt.registerTask('lintbuild', ['travis-lint']);

		/**
		 * Set `test` task
		 */
		grunt.registerTask('test', ['nodeunit']);
	};
})();
