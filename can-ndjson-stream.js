module.exports = function(response) {
  return new ReadableStream({
    start: function(controller) {
      var reader = response.getReader();
      var decoder = new TextDecoder();
      var data_buf = "";
      reader.read().then(function processResult(result) {
        if (result.done) {
          if (data_buf.length != 0 || cancelRequest) {
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
        // console.log("Received "+result.value.length);
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
      // reader.cancel();
    }
  });
}
