@module {function} can-ndjson-stream
@parent can-ecosystem
@package ./package.json

@description Most web applications encounter problems of latency because they process data discretely instead of streamingly. ndjsonstream() function converts a ReadableStream of raw ndjson data into a ReadableStream of Javascript objects to make data transmission faster.


@signature `ndjsonStream( stream )`



  @param {ReadableStream<Byte>} stream The input argument is the ndjsonStream received by client-side from the server-side as the response.body.

  @return {ReadableStream<Object>} The output argument is the ReadableStream Javascript objects produced by ndjsonStream() function.

@body

## Use

To use this npm package implements:

1. Makes a fetch request to an ndjson service.
2. The server side received each record from the database and writes one JSON one line per record.
3. The client side receives the server response as a ReadableStream as the response.body.
4. The ndjsonStream() function converts the response ndjson data stream into a stream of JavaScript Objects.
5. Each JavaScript objects can be retrieved by todoStream.gerReader.read().


```js
fetch()  // make a fetch request
  .then( (response) => {   
 	return ndjsonStream( response.body ); // receive the response
 }).then( (todosStream) => {   
  todosStream.getReader().read().then( function read(result){
    if (result.done) return;
    console.log(result.value);
    todosStream.getReader().read().then( read ); // retrieve each JavaScript objects
  } )
 });
```

**ES6 use**

With StealJS, you can import this module directly in a template that is authorized:

```js
import plugin from "can-ndjson-stream";
```

**CommonJS use**

Use require to load can-ndjson-stream and return converted ReadableStream of Javascript objects:

```js
var ndjsonStream = require("can-ndjson-stream");
```

**AMD use**

Configure the can path, query path and the can-ndjson-stream package:

```js
<script src="require.js"></script>
<script>
    require.config({
        paths: {
            "jquery": "node_modules/jquery/dist/jquery",
            "can": "node_modules/canjs/dist/amd/can"
        },
        packages: [{
                name: 'can-ndjson-stream',
                location: 'node_modules/can-ndjson-stream/dist/amd',
                main: 'lib/can-ndjson-stream'
        }]
    });
    require(["main-amd"], function(){});
</script>
```

**Standalone use**

Load the global version of the plugin:

```js
<script src='./node_modules/can-ndjson-stream/dist/global/can-ndjson-stream.js'></script>
```