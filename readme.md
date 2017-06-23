# can-ndjson-stream

[![Greenkeeper badge](https://badges.greenkeeper.io/canjs/can-ndjson-stream.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/canjs/can-ndjson-stream.png?branch=master)](https://travis-ci.org/canjs/can-ndjson-stream)

[![Build Status](https://saucelabs.com/browser-matrix/can-ndjson-stream.svg)](https://saucelabs.com/beta/builds/270fe2884b8940f68684fae62c89c39e)


Most web applications encounter problems of latency because they process data discretely instead of in streams. `ndjsonstream()` converts a ReadableStream of raw ndjson data into a ReadableStream of Javascript objects.

## Demo

All the demo code can be found in the `demo/` directory. 

1. To get started, run the demo server.

```shell
cd demo
node server.js
```

2. Navigate to localhost:8080/demo/can-ndjson-stream.html to see the demo in action.

3. Check out the demo code in `demo/can-ndjson-stream.html`.

![ndjsonStream Visual](ndjsonStream.gif)


## Contributing

### Making a Build

To make a build of the distributables into `dist/` in the cloned repository run

```
npm install
node build
```

### Running the tests

Tests can run in the browser by opening a webserver and visiting the `test.html` page.
Automated tests that run the tests from the command line in Chrome can be run with

```
npm test
```
