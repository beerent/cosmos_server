class Alert {
	constructor (id, key, title, lines) {
		this.id = id;
		this.key = key;
		this.title = title;
		this.lines = lines;
	}

	GetId() {
		return this.id;
	}

	GetKey() {
		return this.key;
	}

	GetTitle() {
		return this.title;
	}

	GetLines() {
		return this.lines;
	}
};

module.exports = Alert;