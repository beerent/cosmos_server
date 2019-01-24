class ResponseHandler {

	constructor(request, responseObject) {
		this.request = request;
		this.responseObject = responseObject;

		this.error = undefined;
		this.payload = undefined;
		this.success = true;
		this.op = 0;
	}

	SetPayload(payload) {
		this.payload = payload;
	}

	SetRequest(request) {
		this.request = request;
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

		if (this.request != undefined) {
			response.request = this.request;
		}

		return response;
	}

	Send() {
		this.responseObject.json(Response());
		this.responseObject.end();
	}
};

module.exports = ResponseBuilder;