const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

let app;

module.exports = async () => {
	console.log("initializing web server");

	if (app) return app;

	app = express();

	const config = await require("../config")();

	app.listen(config.web.port, () => {
		console.log(`web server listening on port ${config.web.port}`);
	});
}
