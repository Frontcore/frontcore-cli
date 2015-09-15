(function() {
	'use strict';

	var chalk = require('chalk');
	var PRODUCT = require('../package.json');

	exports.error = function(msg, msgPrefix, msgSuffix) {
		console.error(chalk.red(((msgPrefix) ? msgPrefix : '\n Error: ') + msg + ((msgSuffix) ? msgSuffix : ' !')));
	};

	exports.help = function() {
		console.info([
			chalk.cyan('\n Welcome to ' + PRODUCT.name + ' v' + PRODUCT.version + ': Help '),
			'',
			chalk.cyan(' Usage:'),
			'',
			'\tfrontcore <command> [<options>]',
			'',
			chalk.cyan(' Commands:'),
			'',
			'\thelp' + '\t\t- Display help information about ' + PRODUCT.name + ' v' + PRODUCT.version,
			'\tinit' + '\t\t- Interactively create a frontcore configuration file',
			'\tupdate' + '\t\t- Update your global installed ' + PRODUCT.name + ' package',
			'',
			chalk.cyan(' Options:'),
			'',
			'\t[path]' + '\t\t- Only valid with "init" command, specify project directory path, default is [.]',
			'\t[version]' + '\t- Only valid with "update" command, install frontcore-cli version update at global level, default is latest',
			'\n For more info visit ' + PRODUCT.repository.url + '\n'
		].join('\n'));
	};

	exports.info = function(msg) {
		console.info(chalk.blue(msg));
	};

})();