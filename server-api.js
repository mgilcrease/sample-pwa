const init = require("./init.js");

// Invoking the init script will run all subsidiary scripts in the init directory,
// which will take care of all the necessary details of connecting to the database,
// starting up the api server, initializing connections to any other resources such as redis,
// etc, etc.
const start = async () => {
	try {
		await init();
		console.log("server initialized");
	} catch(ex) {
		console.log(ex);
		process.exit(1);
	}
};

start();
