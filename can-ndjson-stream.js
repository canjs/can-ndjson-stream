module.exports = function(response) {
  // For cancellation
  var is_reader, cancellationRequest = false;
  return new ReadableStream({
    start: function(controller) {
      var reader = response.getReader();
      is_reader = reader;
      var decoder = new TextDecoder();
      var data_buf = "";

      reader.read().then(function processResult(result) {
        if (result.done) {
          if (cancellationRequest) {
            // Immediately exit
            return;
          }

          if (data_buf.length != 0) {
            try {
              var data_l = JSON.parse(data_buf);
              controller.enqueue(data_l);
            } catch(e) {
              console.error("Cannot parse JSON: "+data_buf);
            }
          }
          controller.close();
          console.log("Complete");
          return;
        }

        var data = decoder.decode(result.value, {stream: true})
        data_buf += data;
        var lines = data_buf.split("\n");
        while(lines.length > 1) {
          var l = lines.shift();
          try {
            var data_l = JSON.parse(l);
            controller.enqueue(data_l);
          } catch(e) {
            console.error("Cannot parse JSON: "+l);
          }
        }
        data_buf = lines[0];

        return reader.read().then(processResult);
      });

    },
    cancel: function(reason) {
      console.log("Cancel registered");
      cancellationRequest = true;
      is_reader.cancel();
    }
  });
}
