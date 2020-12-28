class LiveRound {
	constructor (id, state, added) {
		this.id = id;
		this.state = state;
		this.added = added;
	}

	GetId() {
		return this.id;
	}

	GetState() {
		return this.state;
	}

	GetAdded() {
		return this.added;
	}
};

module.exports = LiveRound;