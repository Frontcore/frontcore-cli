(function() {
	'use strict';

	var jsonfile = require('jsonfile');

	exports.writeJSONFile = function(answers, projPath) {
		jsonfile.spaces = 4;
		jsonfile.writeFileSync(projPath, answers);

		return true;
	};

})();