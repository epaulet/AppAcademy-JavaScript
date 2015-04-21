function Board() {
  this.squares = [[null, null, null],
                  [null, null, null],
                  [null, null, null]];
}

Board.prototype.empty = function (pos) {
  return this.squares[pos[0]][pos[1]] === null;
};

Board.prototype.placeMark = function (pos, mark) {
  if (this.empty(pos)) {
    this.squares[pos[0]][pos[1]] = mark;
    return true;
  } else {
    return false;
  }
};

Board.prototype.winner = function () {
  return "O";
};

Board.prototype.rows = function () {
  return this.squares;
};

Board.prototype.columns = function () {
  var columns = [];
  for (var i = 0; i < this.squares[0].length; i++) {
    columns.push([]);
  }

  for (i = 0; i < this.squares.length; i++) {
    for (var j = 0; j < this.squares[i].length; j++) {
      columns[j].push(this.squares[i][j]);
    }
  }

return columns;
};

Board.prototype.diagonals = function () {
  var diag1 = [this.squares[0][0], this.squares[1][1], this.squares[2][2]];
  var diag2 = [this.squares[0][2], this.squares[1][1], this.squares[2][0]];
  return [diag1, diag2];
};

Board.prototype.won = function () {
  var winSequences = this.rows().concat(this.columns()).concat(this.diagonals());

  for (var i = 0; i < winSequences.length; i ++) {
    var sequence = JSON.stringify(winSequences[i]);
    var xSequence = JSON.stringify(['X','X','X']);
    var oSequence = JSON.stringify(['O','O','O']);

    if (sequence === xSequence || sequence === oSequence) {
      return true;
    }
  }

  return false;
};

Board.prototype.winner = function () {
  var winSequences = this.rows.concat(this.columns).concat(this.diagonals);

  for (var i = 0; i < winSequences.length; i ++) {
    var sequence = JSON.stringify(winSequences[i]);
    var xSequence = JSON.stringify(['X','X','X']);
    var oSequence = JSON.stringify(['O','O','O']);

    if (sequence === xSequence) {
      return 'X';
    } else if (sequence === oSequence) {
      return 'O';
    }
  }

  return null;
};

Board.prototype.display = function () {
  console.log("Current Board:");
  this.rows().forEach (function(row) {
    console.log(JSON.stringify(row));
  });
};

module.exports = Board;
