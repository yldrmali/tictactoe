document.querySelector('.result').style.display = 'none';

var size = 3; //as default
var EMPTY = '&nbsp;';
var gameBoard = [];
var turn = 'X';
var moves = 0;
let final = '';

//IIFE,module pattern
(function setSize() {
  let nsize = prompt('SET SIZE, 3 or 4 or 5', 3);
  if (Number(nsize) < 3 || Number(nsize) > 5) {
    setSize();
  } else {
    size =nsize;
    init();
  }
})();

function init() {
  var board = document.createElement('table');
  var identifier = 1;
  for (var i = 0; i < size; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);
    for (var j = 0; j < size; j++) {
      var cell = document.createElement('td');
      cell.dataset.cellStyle = 'cell';
      cell.classList.add('col' + j, 'row' + i);
      if (i == j) {
        cell.classList.add('diagonal0');
      }
      if (j == size - i - 1) {
        cell.classList.add('diagonal1');
      }
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
      gameBoard.push(cell);
      identifier += 1;
    }
  }
  document.getElementById('tictactoe').appendChild(board);
  startNewGame();
}

//new game
function startNewGame() {
  setTimeout(() => {
    moves = 0;
    turn = 'X';
    gameBoard.forEach((square) => {
      square.innerHTML = '&nbsp';
      square.style.backgroundColor = 'white';
      square.style.color = 'gray';
    });
  }, 2000);
}
//factory function
const win = (clicked) => {
  var memberOf = clicked.className.split(' ');
  for (let i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#tictactoe ' + testClass, turn);
    if (items.length == size) {
      for (let item of items) {
        item.style.backgroundColor = '#00d4ff';
        item.style.color = 'white';
      }
      return true;
    }
  }
  return false;
};
//this function will check cols, rows and diagonals respectively.
function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [...elements].filter((element) => element.textContent === text);
}

function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn; //equals x for start
  moves += 1;
  if (win(this)) {
    final = 'winner';
    setResult(turn);
    startNewGame();
  } else if (moves === size * size) {
    final = 'draw';
    setResult(turn);
    startNewGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'Player ' + turn;
  }
}

function setResult(result) {
  document.querySelector('.result').style.display = 'inherit'; //common
  if (final == 'winner') {
    document.querySelector('#result').textContent = `${result} is winner`;
  } else {
    document.querySelector('#result').textContent = `It is a draw`;
  }
  setTimeout(() => {
    document.querySelector('.result').style.display = 'none'; //common
    document.querySelector('#result').textContent = EMPTY;
  }, 2000);
}
