const glob = require("glob");

module.exports = () => {
	return new Promise( (resolve, reject) => {
		glob("./routes/*.js", (err, files) => {
			if (err) return reject(err);

			for (let file of files) {
				require(file);
			}
			resolve();
		});
	});
}
