/**
 *  
 *  A robot located at the top left corner of a 5x5 grid is trying to reach the 
 *  bottom right corner. The robot can move either up, down, left, or right, 
 *  but cannot visit the same spot twice. How many possible unique paths are 
 *  there to the bottom right corner? 
 *  
 *  make your solution work for a grid of any size.
 *
 */

// A Board class will be useful

var makeBoard = function(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board.push([]);
    for (var j = 0; j < n; j++) {
      board[i].push(false);
    }
  }
  board.togglePiece = function(i, j) {
    this[i][j] = !this[i][j];
  };
  board.hasBeenVisited = function(i, j) {
    return !!this[i][j];
  };
  return board;
};

//so always start from board[0][0];
//maybe need to use recursion to simplify it?
//for the current spot that the robot is on, what are the possible moves, one move on recursive call?
//
//base case:
//  whenever a path hit the board[n-1][n-1], that is one path, recursion should end there
//  or when no possible moves, it should end there too and that path isn't a valid path.
//
//what to return at the base case:
//  if valid path, then return a number, maybe 1?
//  if not valid path, then return 0?
//  
//what to do about the return:
//  since there maybe up to 3 possible moves(4 directions - the back path), and all maybe valid
//  sum all the return numbers together and return them?
//  also make sure to un-toggle the toggled one before you return.
//  
//how to break it into smaller case:
//  if board[0][0] is a possible move, then use it
//  if not then
//  
//  so every round, you toggle one piece, then recursively call, and pass the marked up board
//  but then next round how do you where is the piece? maybe when should recursively with the next spot as argument
//  
//  
var robotPaths = function(n, board, i, j) {

  //toggle a piece at the beginning of each recursive call:
  //hope that this would be called with 0 and 0 at first
  if (arguments.length === 2){board.togglePiece(0, 0);}
  board.togglePiece(i, j);

  //base case:
  //hit the n-1, n-1, that means valid path:
  if (board.hasBeenVisited(n-1, n-1)){return 1;}
  //no more valid move, that means dead end: the pieces at top down left right are not valid to move to.
  //check all position and put valid ones in an array?

  var nextPoses = [{x:i, y:j-1}, {x:i, y:j+1}, {x:i-1, y:j}, {x:i+1, y:j}];
  //check and see if the x and y on all directions are valid first
  nextPoses = nextPoses.filter(function(pos){
     var withinBoard = pos.x < n && pos.x > -1 && pos.y < n && pos.y > -1;
     var validMove = board.hasBeenVisited(pos.x, pos.y);
     return withinBoard && validMove;
  });
  //if not nextPoses: dead end and return 0
  if (nextPoses.length === 0 ){return 0;}

  var pathAmount = nextPoses.reduce(function (pathAmount, pos) {
    pathAmount += robotPaths(n, board, pos.x, pos.y);
    return pathAmount;
  }, 0);

  board.togglePiece(i, j);
  
  return pathAmount;

};

