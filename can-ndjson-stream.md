@module {function} can-ndjson-stream
@parent can-ecosystem
@package ./package.json

@description Most web applications encounter problems of latency because they process data discretely instead of streamingly. In this project, we employ ndjsonstream() function to convert a ReadableStream of raw ndjson data into a ReadableStream of Javascript objects to make data transmission faster.


This npm package implements:

	1. Makes a fetch request to an ndjson service.

	2. The server side received each record from the database and writes one JSON one line per record.

	3. The client side receives the server response as a ReadableStream as the response.body.

	4. The ndjsonStream() function converts the response ndjson data stream into a stream of JavaScript Objects.

	5. Each JavaScript objects can be retrieved by todoStream.gerReader.read().

@signature `ndjsonStream( stream )`

  @param {ReadableStream<Byte>} stream The input argument is the ndjsonStream received by client-side from the server-side as the response.body.

  @return {ReadableStream<Object>} The output argument is the ReadableStream Javascript objects produced by ndjsonStream() function.

@body

## Use

How to use this:

```js
var ndjsonStream = require("can-ndjson-stream");

```


