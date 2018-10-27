/**
 * require-directory.js
 **/

const glob = require("glob");

/**
 * This module attempts to require all javascript modules in a given directory.
 * It is assumed that each module will return a function that returns a promise.
 **/
module.exports = async (path) => {
	return new Promise( async (resolve, reject) => {
		glob(`${path}/*.js`, (err, files) => {
			if (err) return reject(err);
			
			let promises = files.map( async (file) => {
				// assume that all modules being required return a function that returns a promise
				return require(file)();
			});
			
			resolve(Promise.all(promises));
		});
	});
}
