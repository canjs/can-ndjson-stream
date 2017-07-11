var stealTools = require("steal-tools");

stealTools.export({
	steal: {
		config: __dirname + "/package.json!npm"
	},
	outputs: {
		"+cjs": {},
		"+amd": {},
		"+standalone": {
			exports: {
				"can-namespace": "can"
			}
		}
	}
}).catch(function(e){

	setTimeout(function(){
		throw e;
	}, 1);

});
