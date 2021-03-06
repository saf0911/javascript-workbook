'use strict';

var assert = require('assert');
var colors = require('colors/safe');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var board = [];
var solution = '';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var colors = require('colors/safe');

function printBoard() {
  for (var i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

function generateSolution() {
  for (var i = 0; i < 4; i++) {
    var randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateHint(solution, guess) {
  // your code here
  // splitting the solution and guess into individual letters
  var solutionArray = solution.split('');
  var guessArray = guess.split('');
  //setting the correct answers to 0 
  var correctLetterLocations = 0;
  var correctLetters = 0;
  //loop through the array
  for (var i = 0; i < solutionArray.length; i++) {
    //comparing the guess against the answer
    if (solutionArray[i] === guessArray[i]) {
      //counting number of correct answers
      correctLetterLocations++;
      //the correct answer is taken out of the mix
      solutionArray[i] = null;  
    }
    
  }
  //loop through the array again
  for (i = 0; i <= solutionArray.length; i++ ) {
    // settign targetIndex to the correct letters in the wrong place
    var targetIndex = guessArray.indexOf(solutionArray[i]);
   //if the targetIndex is at spot zero or higher 
    if (targetIndex > -1) {
      
      correctLetters++;
      solutionArray[i] = null;
     
    }
  }
  

   return correctLetterLocations + "-" + correctLetters;
}

function mastermind(guess) {
  // your code here
  
  if (guess === solution) {
    return ('You guessed it!');
  }
  if (board.length === 10) {
    return ('You ran out of turns! The solution was ' + solution);
  }
  else {
    var hint = generateHint(solution, guess);
    board.push(hint +' '+ guess);
    return ('Guess again');
  }
  board;
}


function getPrompt() {
  rl.question('guess: ', (guess) => {
    console.log( mastermind(guess) );
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#mastermind()', function () {
    it('should register a guess and generate hints', function () {
      solution = 'abcd';
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', function () {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', function () {
    it('should generate hints', function () {
      assert.equal(generateHint('abcd', 'abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', function () {
      assert.equal(generateHint('abcd', 'aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
