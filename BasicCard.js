// Require fs for file i/o to read and write to files
var fs = require('fs');

// create the basicCard constructor function
function BasicCard(front, back) {
	this.front = front;
	this.back = back;
	// add to the log file for future reference
	this.createCard = function() {
		var data = {
			front: this.front,
			back: this.back,
			type: "basicCard",
		};
		// append
		fs.appendFile('log.txt', JSON.stringify(data) + ',', 'utf8', function(err) {
			if (err) {
				console.log(err);
			}
		});
	};

}

// export to app.js
module.exports = BasicCard;