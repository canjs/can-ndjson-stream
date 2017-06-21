@module {function} can-ndjson-stream
@parent can-ecosystem
@package ../package.json

@description can-ndjson-stream parses an ndjson stream into a stream of JavaScript objects.

@signature `ndjsonStream(stream)`

@param {ReadableStream<Byte>} a ndjson stream

@return {ReadableStream<Object>} The output is a ReadableStream of JS objects that has the following method:

@body

## Use

This JavaScript module converts a stream of ndjson objects to a stream of JavaScript objects. In order to use this module, you must first have a service that sends an ndjson stream.

1. Make a `fetch` request to an ndjson service by passing the endpoint as an argument. 
2. The service responds with a stream of ndjson. 
3. `Fetch`'s `then` method is provided a `Response` instance, which we can parse using `ndjsonStream()` into a JavaScript `ReadableStream`
5. Each JavaScript object in the stream can be read by calling `[streamName].getReader.read()`.
6. `ReadableStream` exposes a `cancel` method that can be called to cancel the stream.

```js
  fetch('some/endpoint')  // make a fetch request to a ndjson stream service
    .then( (response) => { 
    return ndjsonStream(response.body); //ndjsonStream parses the response.body
   }).then( (todosStream) => { 
    //retain access to the reader so that you can cancel it
   const reader = todosStream.getReader();

   reader.read().then(read = (result) => {
    if(result.value.user === '19572827') {
      //cancel stream and pass an optional cancellation message.
        reader.cancel('Matched userId');
      }
      if (result.done) return;
      console.log(result.value);
      todosStream.getReader().read().then(read);
    });
   });
```
