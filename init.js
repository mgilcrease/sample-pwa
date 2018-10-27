const requireDirectory = require("./utilities/require-directory");
const path = require("path");

module.exports = async () => {
	// Run all scripts in the init directory
	return requireDirectory(path.resolve(__dirname, "init"));
}
