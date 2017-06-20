'use strict';

var testSauceLabs = require('test-saucelabs');

// https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
var platforms = [{
  browserName: 'chrome',
  platform: 'OS X 10.11',
  version: '58.0'
},{
  browserName: 'chrome',
  platform: 'OS X 10.9',
  version: '54.0'
},
{
  browserName: 'chrome',
  platform: 'Windows 10',
  version: '59.0'
},
{
  browserName: 'chrome',
  platform: 'Windows 7',
  version: '53.0'
}];

var url = 'http://localhost:3000/test.html';

testSauceLabs({
  urls: [{ name: "can-ndjson-stream", url : url }],
  platforms: platforms
});