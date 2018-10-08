class ResponseBuilder {

	constructor() {
		this.error = undefined;
		this.payload = undefined;
		this.success = true;
		this.op = 0;
	}

	SetPayload(payload) {
		this.payload = payload;
	}

	SetError(error) {
		this.success = false;
		this.error = error;
	}

	Response() {
		var response = {};
		response.success = this.success;
		response.op = this.op;

		if (this.payload != undefined) {
			response.payload = this.payload;
		}
		
		if (this.error != undefined) {
			response.op = this.error.id;
			response.errorText = this.error.note;
		}

		return response;
	}
};

module.exports = ResponseBuilder;