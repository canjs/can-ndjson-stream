'use strict';

var testSauceLabs = require('test-saucelabs');

// https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
var platforms = [{
  browserName: 'googlechrome',
	platform: 'OS X 10.12',
	version: 'latest',
},
{
  browserName: 'chrome',
  platform: 'Windows 10',
  version: '59.0'
},
{
  browserName: 'chrome',
  platform: 'Windows 7',
  version: '73.0'
}];

var url = 'http://localhost:3000/test.html';

testSauceLabs({
  urls: [{ name: "can-ndjson-stream", url : url }],
  platforms: platforms
});
