@module {function} can-ndjson-stream
@parent can-ecosystem
@package ./package.json

@description Most web applications encounter problems of latency because they process data discretely instead of streamingly. ndjsonstream() function converts a ReadableStream of raw ndjson data into a ReadableStream of Javascript objects to make data transmission faster.


@signature `ndjsonStream( stream )`



  @param {ReadableStream<Byte>} stream The input argument is a ReadableStream ndjsonStream received by client-side from the server-side as the response.body.

  @return {ReadableStream<Object>} The output argument is a ReadableStream JavaScript objects produced by ndjsonStream() function.

@body

## Use

To use this npm package to implement data stream transmission:

1. Makes a `fetch` request to an ndjson service.
2. The server side received each record from the database and writes one JSON one line per record.
3. The client side receives the server response as a ReadableStream as the `response.body`.
4. The `ndjsonStream()` function converts the response ndjson data stream into a stream of JavaScript Objects.
5. Each JavaScript objects can be retrieved by `todoStream.gerReader.read()`.


```js
fetch()  // make a fetch request
  .then( (response) => {   // receive the response 
 	return ndjsonStream( response.body ); // call ndjsonStream() function to convert ndjson stream into JS stream
 }).then( (todosStream) => {   
  todosStream.getReader().read().then( function read(result){
    if (result.done) return;
    console.log(result.value);
    todosStream.getReader().read().then( read ); // retrieve each JavaScript objects
  } )
 });
```