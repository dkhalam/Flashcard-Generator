// required packages/files
var BasicCard = require('./BasicCard.js');

var ClozeCard = require('./ClozeCard.js');

var inquirer = require('inquirer');

var fs = require('fs');

function startCards() {
    // Prompts to determine actions
    inquirer.prompt([{
        type: 'list',
        message: "Let's make some flashcards!",
        choices: ['Add a new flashcard', 'EXIT'],
        name: 'begin'
    }, {
        type: 'list',
        message: 'Would you like to create a basic flashcard, or a cloze card?',
        choices: ['Basic', 'Cloze'],
        name: 'cardType',
        // Display prompt when a new flashcard is desired
        when: function(response) {
            return response.begin === 'Add a new flashcard';
        }
    }]).then(function(response) {
        // call flashcard related functions
        if (response.begin === 'Add a new flashcard') {
            // generate a basic flashcard
            if (response.cardType === 'Basic') {
                generateBasic();
                // generate a cloze flashcar
            } else if (response.cardType === 'Cloze') {
                generateCloze();
                // log an error
            } else {
                console.log('Something has gone wrong with flashcard creation! Please try again!');
            }
            // show previous flashcards
            // exit
        } else if (response.begin === 'EXIT') {
            console.log('See ya next time!');
            return;
            // if error, show this message and exit CLI
        } else {
            console.log('Something has gone wrong with displaying the information! Please try again!');
            return;
        }
        // Catch errors
    }).catch(function(err) {
        console.log(err);
    });
}

function generateBasic() {
	inquirer.prompt([{
		message: "What goes on the front of this card?",
		name: "front"
	}, {
		message: "What goes on the back of this card?",
		name: "back"	
	}]).then(function(response) {
		var newBasic = new BasicCard(response.front, response.back);
		newBasic.createCard();

		console.log('Front: ' + newBasic.front);

		console.log('Back: ' + newBasic.back);

		startCards();

	}).catch(function(err) {
		console.log(err);
	});
}

function generateCloze() {
	inquirer.prompt([{
		message: 'What is the full text of the card?',
		name: 'fullText'
	}, {
		message: 'What shall we cloze?',
		name: 'fullCloze'	
	}]).then(function(response) {
		var newCloze = new ClozeCard(response.fullText, response.fullCloze);

		newCloze.createClozeDeleted();

		console.log('Full text: ' + newCloze.text);
		console.log('Cloze: ' + newCloze.cloze);
		console.log('Without cloze: ' + newCloze.clozeDeleted);

		if (newCloze.clozeDeleted !== '') {
            // create and append JSON to file
            newCloze.createCard();
        } else {
            console.log('File cannot be appended')
        }
        // restart from the beginning
        startCards();
	}).catch(function(err) {
		console.log(err);
	});
}

startCards();
