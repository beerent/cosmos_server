const home_dir = require('os').homedir();
const cosmos_config = home_dir + "/.cosmos/config";

class ConfigLoader {
	constructor (environment) {
		this.config = this.LoadConfig();
		this.environment = environment;
	}

	LoadConfig() {
		var fs = require('fs');
		var obj = JSON.parse(fs.readFileSync(cosmos_config, 'utf8'));

		return obj;	
	}

	GetSourceRoot() {
		return this.config["source_root"][this.environment];
	}

	GetDatabaseConnectionInfo() {
		return this.config["database"][this.environment];
	}

	GetApiServer() {
		return this.config["api"][this.environment]["host"] + ":" + this.config["api"][this.environment]["port"];
	}

}

module.exports = ConfigLoader;