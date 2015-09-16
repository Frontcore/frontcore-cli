(function() {
	'use strict';

	exports.dummytest = function(test) {
		test.expect(1);
		test.ok(true, "this assertion should pass");
		test.done();
	};

})();