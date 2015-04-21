var Board = require('./board');

function Game(reader) {
  this.reader = reader;
  this.board = new Board();
  this.mark = "X";
  this.instructed = false;
}

Game.prototype.promptMove = function(callback) {
  var game = this;
  this.reader.question("What square does " + this.mark + " want to move to?\n", function(answer) {
    callback.call(game, answer);
  });
};

Game.prototype.parseMove = function(num) {
  var row = Math.floor((num - 1) / 3);
  var col = (num - 1) % 3;
  return [row, col];
};

Game.prototype.switchMark = function() {
  this.mark = this.mark === "X" ? "O" : "X";
  return this.mark;
};

Game.prototype.printInstructions = function() {
  console.log("Welcome to Tic Tac Toe. The squares are numbered like so:");
  var referenceArray = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  referenceArray.forEach(function (row) {
    console.log(row);
  });
  console.log();
};

Game.prototype.run = function(completionCallback) {
  if (!this.instructed) {
    this.printInstructions();
    this.instructed = true;
  }
  this.board.display();
  this.promptMove(function (location) {
    if (this.board.placeMark(this.parseMove(location), this.mark)) {
      this.switchMark();
    } else {
      console.log("Invalid move!");
    }
    if (this.board.won()) {
      console.log(this.switchMark() + " wins!");
      completionCallback();
    } else {
      this.run(completionCallback);
    }
  });
};

module.exports = Game;
