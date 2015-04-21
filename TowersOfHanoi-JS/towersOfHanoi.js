var readline = require("readline");
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var HanoiGame = {
  stacks: [[3, 2, 1], [], []],

  isWon: function () {
    return this.stacks[0].length === 0 &&
      (this.stacks[1].length === 3 ||  this.stacks[2].length === 3);
  },

  isValidMove: function (startTowerIdx, endTowerIdx) {
    var start = this.stacks[startTowerIdx];
    var end = this.stacks[endTowerIdx];
    if (start.length === 0) {
      return false;
    } else if (end.length === 0) {
      return true;
    } else {
      return start[start.length - 1] < end[end.length - 1];
    }
  },

  move: function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  },

  print: function () {
    console.log(JSON.stringify(this.stacks));
  },

  promptMove: function(callback) {
    this.print();
    reader.question("Which tower are you moving from?", function(start) {
      reader.question("Which tower are you moving to?", function(end) {
        callback.call(HanoiGame, start, end);
      });
    });
  },

  run: function(completionCallback) {
    this.promptMove(function(start, end) {
      if (this.move(start, end) === false) {
        console.log("You can't do that.");
      }

      if (this.isWon()) {
        console.log("You won... :/");
        completionCallback();
      } else {
        this.run(completionCallback);
      }
    });
  }
};

HanoiGame.run(function () {
  reader.close();
});
