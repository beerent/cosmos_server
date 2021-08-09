class CosmosLiveChatEntry {
	constructor (session, user, message, seconds_ago) {
		this.session = session;
		this.user = user;
		this.message = message;
		this.seconds_ago = seconds_ago;
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

	GetSecondsAgo() {
		return this.seconds_ago;
	}

	ToPayload() {
		var payload = {
			user : this.user.username,
			message : this.message,
			seconds_ago : this.seconds_ago
		};

		return payload;
	}
};

module.exports = CosmosLiveChatEntry;