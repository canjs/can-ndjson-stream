var QUnit = require("steal-qunit");
var ndjsonStream = require("can-ndjson-stream");

QUnit.module('can-ndjson-stream');

QUnit.test('Initialized the plugin', function(){
	QUnit.equal(typeof ndjsonStream, 'function');
});
