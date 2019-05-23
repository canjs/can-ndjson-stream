'use strict';

var testSauceLabs = require('test-saucelabs');

var maxDuration = 1800; // seconds, default 1800, max 10800
var commandTimeout = 600; // seconds, default 300, max 600
var idleTimeout = 1000; // seconds, default 90, max 1000

// https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
var platforms = [{
  browserName: 'firefox',
  platform: 'Windows 10',
  version: 'latest',
  maxDuration: maxDuration,
  commandTimeout: commandTimeout,
  idleTimeout: idleTimeout
}, {
  browserName: 'googlechrome',
  platform: 'OS X 10.12',
  version: 'latest',
  maxDuration: maxDuration,
  commandTimeout: commandTimeout,
  idleTimeout: idleTimeout
}, {
  browserName: 'safari',
  platform: 'OS X 10.13',
  version: '11',
  maxDuration: maxDuration,
  commandTimeout: commandTimeout,
  idleTimeout: idleTimeout
}, {/*
  browserName: 'internet explorer',
  platform: 'Windows 10',
  version: '11.0'
}, { */
  browserName: 'MicrosoftEdge',
  platform: 'Windows 10',
  maxDuration: maxDuration,
  commandTimeout: commandTimeout,
  idleTimeout: idleTimeout
}];

var url = 'http://localhost:3000/test.html';

testSauceLabs({
  urls: [{ name: "can-ndjson-stream", url : url }],
  platforms: platforms
});
