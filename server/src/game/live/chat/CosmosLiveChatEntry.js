class CosmosLiveChatEntry {
	constructor (session, user, message, added) {
		this.session = session;
		this.user = user;
		this.message = message;
		this.added = added;
	}

	GetSession() {
		return this.session;
	}

	GetUser() {
		return this.user;
	}

	GetMessage() {
		return this.message;
	}

	GetAdded() {
		return this.added;
	}

	ToPayload() {
		var payload = {
			user : this.user.username,
			message : this.message,
			added : this.added
		};

		return payload;
	}
};

module.exports = CosmosLiveChatEntry;