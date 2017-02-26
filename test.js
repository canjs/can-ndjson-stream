var testee = require("testee");

// travis-encrypt BROWSERSTACK__USER=<username> -r canjs/can-ndjson-stream --add

var browserstack = {
  "timeout": 600,
  "tunnel": {
	"type": "browserstack",
	"key": process.env.BROWSERSTACK_KEY
  },
  "launch": {
	"type": "browserstack",
	"username": process.env.BROWSERSTACK_USER,
	"password": process.env.BROWSERSTACK_PASSWORD,
	"version": 2
  }
};

testee.test(['test.html'], [{
	"os": "win",
	"browser": "chrome",
	"version": "latest"
}], browserstack).then(function() {
	process.exitCode = 0;
}, function() {
	process.exitCode = 1;
});
