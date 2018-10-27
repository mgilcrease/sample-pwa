const _ = require("lodash");
const globalConfig = require("./config/global");
const envConfig = require(`./config/${process.env.NODE_ENV}.js`);

let config;

module.exports = async () => {
	if (!config)
		config = _.merge(globalConfig, envConfig);

	return config;
}

