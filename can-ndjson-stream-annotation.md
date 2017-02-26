@module {coding-with-annotation} can-ndjson-stream
@parent can-ecosystem
@package ./package.json

@description This markdown file tells how coding works.

@signature `ndjsonStream( stream )`


  @param {ReadableStream<Byte>} stream The input argument is a ReadableStream ndjsonStream received by client-side from the server-side as the response.body.

  @return {ReadableStream<Object>} The output argument is a ReadableStream JavaScript objects produced by ndjsonStream() function.

@body

```js
module.exports = function(response) {
  // global variable is_reader and cancellationRequest shared by start and cancal function
  var is_reader, cancellationRequest = false;
  return new ReadableStream({
    // start function: users can call this function to converts a ReadableStream of raw ndjson data into a ReadableStream of Javascript objects
    start: function(controller) {
      var reader = response.getReader();
      is_reader = reader;
      var decoder = new TextDecoder();
      var data_buf = "";

      reader.read().then(function processResult(result) {
        // stream convertion work is done 
        if (result.done) {
          if (cancellationRequest) {
            return;
          }
          // only leave the last line in buffer, assuming it is not finished.
          data_buf = data_buf.trim();
          if (data_buf.length !== 0) {
            try {
              var data_l = JSON.parse(data_buf);
              controller.enqueue(data_l);
            } catch(e) {
              controller.error(e);
              return;
            }
          }
          controller.close();
          return;
        }

        // stream convertion work is on the way, decode all but the last line in data buffer into JS objects
        var data = decoder.decode(result.value, {stream: true});
        data_buf += data;
        var lines = data_buf.split("\n");
        for(var i = 0; i < lines.length - 1; ++i) {
          var l = lines[i].trim();
          if (l.length > 0) {
            try {
              var data_line = JSON.parse(l);
              controller.enqueue(data_line);
            } catch(e) {
              controller.error(e);
              cancellationRequest = true;
              reader.cancel();
              return;
            }
          }
        }
        data_buf = lines[lines.length-1];

        return reader.read().then(processResult);
      });

    },

    // cancal function: users can stop the work of ndjsonStream() function by calling cancel
    cancel: function(reason) {
      console.log("Cancel registered due to ", reason);
      cancellationRequest = true;
      is_reader.cancel();
    }
  });
};
```