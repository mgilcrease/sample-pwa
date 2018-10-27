const mongoose = require("mongoose");

let db;

module.exports = async () => {

	if (db) return db;

	console.log("initializing database");
	const config = await require("../config")();

	process.on("exit", () => {
		mongoose.connection.close();
	});

	return db = mongoose.connect(config.db.url, config.db.options );
}
