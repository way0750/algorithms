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

// so make one move mark it, then check all four directions to get the spots that exists and are not marked, 
// go to those spots
// sounds recursive
// base case1: can't find spot to move to return 0, base case 2: got to the right bottom, return 1 for one path
// how to break smaller: get possible spots from up bottom left right, then recursively call each of them
// what to return, always a number
// what to do with returns: add them up

var drawMatrix = (matrix) => {
  matrix.forEach((row) => {
    row = row.map((cell) => {
      return cell ? "[ "+(cell + "   ").slice(0, 4)+"]" : '[     ]' ;
    });
    console.log(row.join('') + '\n');
  });
  console.log('---------------------');
};


let robotPath = (matrix) => {

  let width = (matrix[0] || []).length - 1;
  let height = matrix.length - 1;
  //make function to check if x and y are in bound: x and y are both larger than -1 and x < width, y < height;
  let checkXYInBound = (x, y) => {
    return x > -1 && y > -1 && x <= width && y <= height;
  };

  let searchPath = (matrix, x, y, stack) => {

    if (x === width && y === height){
      //mark and draw matrix here
      matrix[y][x] = stack;
      drawMatrix(matrix);
      matrix[y][x] = false;
      return 1;
    } else {
      //mark the spot to current stack number as a way to track the path;
      matrix[y][x] = stack;
    }

    //go through all possible spots:
    let foundPath = [[-1, 0], [1, 0], [0, -1], [0, 1]].reduce( (pathAmount, posArr) => {
      //in bound and not visited
      let nextX = x + posArr[0], nextY = y + posArr[1];
      if (checkXYInBound(nextX, nextY) && !(matrix[nextY][nextX])) {
        pathAmount += searchPath(matrix, nextX, nextY, stack + 1);
      }
      return pathAmount;
    }, 0);

    matrix[y][x] = false;
    return foundPath;
  };

  return searchPath(matrix, 0 , 0, 1);
};


let matrix = makeBoard(4);
robotPath(matrix);
