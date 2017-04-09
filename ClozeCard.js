// Require fs for file i/o to read and write to files
var fs = require('fs');

// constructor function to create properties and methods of ClozeCard
function ClozeCard(text, cloze) {
	this.text = text;
	this.cloze = cloze;
	this.clozeDeleted = '';

	// method that will delete cloze text 
	this.createClozeDeleted = function() {
		if (this.text.indexOf(this.cloze) >= 0) {
			this.clozeDeleted = this.text.replace(this.cloze, '...');
		} else {
			console.log(err)
		}
	};
	// add to the log file for future reference
	this.createCard = function() {
		// create cloze flashcard object
		var data = {
			text: this.text,
			cloze: this.cloze,
			clozeDeleted: this.clozeDeleted,
			type: 'ClozeCard'
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
module.exports = ClozeCard;

