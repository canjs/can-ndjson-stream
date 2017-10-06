var QUnit = require("steal-qunit");
var ndjsonStream = require("can-ndjson-stream");

// Skip all tests in browsers that do not support ReadableStream
// https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
var isReadStreamSupported = true;
try {
  new ReadableStream();
} catch(err) {
  isReadStreamSupported = false;
}

var conditionalTest = isReadStreamSupported ? QUnit.test : QUnit.skip;
var conditionalAsyncTest = isReadStreamSupported ? QUnit.asyncTest : QUnit.skip;

function readableStreamFromString(s) {
  return new ReadableStream({
    start: function(controller) {
      var encoder = new TextEncoder();
      // Our current position in s
      var pos = 0;
      // How much to serve on each push
      var chunkSize = 1;

      function push() {
        // Are we done?
        if (pos >= s.length) {
          controller.close();
          return;
        }

        // Push some of the html,
        // converting it into an Uint8Array of utf-8 data
        controller.enqueue(
          encoder.encode(s.slice(pos, pos + chunkSize))
        );

        // Advance the position
        pos += chunkSize;

        push();
      }

      // Let's go!
      push();
    },
    cancel: function() {

    }
  });
}

function inputStream(objArray) {
  var jsons = objArray.map( function(obj) {return JSON.stringify(obj);} );
  return readableStreamFromString(jsons.join('\n'));
}

QUnit.module('can-ndjson-stream');

conditionalTest('Initialized the plugin', function(){
	QUnit.equal(typeof ndjsonStream, 'function');
});

conditionalAsyncTest('simple_test_from_stream', function(assert) {
  var testObject = [
    {"date":"2017-02-24 03:07:45","user":"21109850","fuel":"37","ammo":"2","steel":"13","baux":"5","seaweed":"0","type":"LOOT","product":"134"},
    {"date":"2017-02-22 04:40:13","user":"21109850","fuel":"37","ammo":"2","steel":"13","baux":"5","seaweed":"0","type":"LOOT","product":"75"},
    {"date":"2017-02-21 20:47:51","user":"26464462","fuel":"37","ammo":"3","steel":"19","baux":"5","seaweed":"1","type":"LOOT","product":"81"}
  ];
  var readObjects = [];

  var todoStream = ndjsonStream( inputStream(testObject) );

  function test(todosStream) {
    var reader = todosStream.getReader();
    reader.read().then(function read(result) {
      if (result.done) {
        assert.deepEqual(readObjects, testObject, "Two arrays should be the same in value");
        QUnit.start();
        return;
      }
      readObjects.push(result.value);
      reader.read().then(read);
    });
  }
  test(todoStream);
});

conditionalAsyncTest('malformed json', function(assert) {
  var malformed_string = "{\"1\":2}\n{sss: 2}";
  var readObjects = [];
  var todoStream = ndjsonStream( readableStreamFromString(malformed_string) );
  var reader = todoStream.getReader();
  var errorCaught = false;
  function errCheck() {
    errorCaught = true;
  }

  var allDone = reader.read().then(function read(result) {
      if (result.done) {
        return;
      }
      readObjects.push(result.value);
      return reader.read().then(read, errCheck);
    }, errCheck);

    allDone.then(function(){
      assert.strictEqual(errorCaught, true, "malformed json string should cause an error");
      QUnit.start();
    }, function(){
      assert.strictEqual(errorCaught, true, "rejected: malformed json string should cause an error");
      QUnit.start();
  });

});

