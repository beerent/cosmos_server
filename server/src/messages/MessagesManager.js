var ResponseBuilder = require("../response/ResponseBuilder.js");
var Message = require("./Message.js");

class MessagesManager {

	constructor (dbm, errors) {
		this.dbm = dbm;
		this.errors = errors;
	}

	HandleGetMessagesRequest(req, res, responseBuilder) {
		var self = this;

		self.GetActiveMessages(responseBuilder, function (response) {
			res.json(response);
			res.end();
			self.dbm.Close();
		});
	}

	GetActiveMessages(responseBuilder, callback) {
		var self = this;

		var currentDate = this.GetCurrentDate();
		self.GetMessages(function (messages) {
			messages = messages.filter(message => self.MessageIsActive(message, currentDate));
			messages = self.shuffle(messages);

			var messagesObj = {};
			messagesObj.messages = messages;
			responseBuilder.SetPayload(messagesObj);
			callback(responseBuilder.Response());
		});
	}

	MessageIsActive(message, currentDate) {
		var startDate = new Date(message.start);
		var expireDate = new Date(message.expire);

		return currentDate >= startDate && currentDate <= expireDate;
	}

	shuffle(array) {
	  var currentIndex = array.length,  randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex--;

	    // And swap it with the current element.
	    [array[currentIndex], array[randomIndex]] = [
	      array[randomIndex], array[currentIndex]];
	  }

	  return array;
	}

	GetCurrentDate() {
		var timelagging = 6;  //six hour difference

	    var utc = new Date();
	    var cdt = new Date(utc.getTime()-((1 * 60 * 60 * 1000) * timelagging));

	    return cdt;
	}

	GetMessages(callback) {
		var self = this;

		var sql = "select id, message, start, expire from messages;";

		this.dbm.Query(sql, function(results) {
			var id = undefined;
			var message = undefined;
			var start = undefined;
			var expire = undefined;

			var messages = [];
			results.forEach(function(entry) {
				id = entry.id;
				message = entry.message;
				start = entry.start;
				expire = entry.expire;

				var message = new Message(id, message, start, expire);
				messages.push(message);
			});
			
			callback(messages);
		});
	}
}

module.exports = MessagesManager;