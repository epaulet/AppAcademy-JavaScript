var TTT = require('./ttt');
var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


game = new TTT.Game(reader);
game.run(function() {
  reader.close();
});
