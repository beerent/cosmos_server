class Authenticator {

	constructor (dbm) {
		this.dbm = dbm;
	}

	HandleIfAuthenticated(query, callback) {
		console.log("in auth function");
		if (/*implement auth here*/ true) {
			callback();
		}
	}

};

module.exports = Authenticator;