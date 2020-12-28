class LiveRound {
	constructor (id, state, start, added) {
		this.id = id;
		this.state = state;
		this.start = start;
		this.added = added;
	}

	GetId() {
		return this.id;
	}

	GetState() {
		return this.state;
	}

	GetStart() {
		return this.start;
	}

	GetAdded() {
		return this.added;
	}
};

module.exports = LiveRound;