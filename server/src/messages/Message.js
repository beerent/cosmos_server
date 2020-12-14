class Message {
	constructor (id, message, start, expire) {
		this.id = id;
		this.message = message;
		this.start = start;
		this.expire = expire;
	}

	GetId() {
		return this.id;
	}

	GetMessage() {
		return this.message;
	}

	GetStart() {
		return this.start;
	}

	GetExpire() {
		return this.expire;
	}
};

module.exports = Message;