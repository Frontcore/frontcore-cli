(function() {
	'use strict';

	var _hasKey = function(obj, key) {
		if (obj.hasOwnProperty(key)) {
			return true;
		}
		return false;
	};

	exports.HTMLDir = function(answers) {
		if (_hasKey(answers, 'directory')) {
			answers.directory.html = {};
			answers.directory.html.files = [];
			answers.directory.html.ignore = [];
			answers.directory.html.options = {};
		}

		return answers;
	};

	exports.CSSDir = function(answers) {
		if (_hasKey(answers, 'directory')) {
			answers.directory.css = {};
			answers.directory.css.files = [];
			answers.directory.css.ignore = [];
			answers.directory.css.options = {};
		}

		return answers;
	};

	exports.JSDir = function(answers) {
		if (_hasKey(answers, 'directory')) {
			answers.directory.js = {};
			answers.directory.js.files = [];
			answers.directory.js.ignore = [];
			answers.directory.js.options = {};
		}

		return answers;
	};

})();