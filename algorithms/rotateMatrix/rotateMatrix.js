/**
 * Write a function that rotates a NxN matrix 90 degrees.
 *
 * A matrix, also called a 2-D array, is simply an array of arrays of values.
 *
 * Example 1x1 matrix:
 *   [ [1] ]
 *
 * Example 2x2 matrix:
 *  [ [1,2],
 *    [3,4] ]
 *
 * Important note:
 *   In mathematics, and generally in CS, matrices are identified as m-by-n, where m is
 *   the number of *rows* and n is the number of *columns*. So an [i][j] address in a matrix
 *   will be i places down, and j places over. This usually matches the way arrays are
 *   addressed in code, but keep in mind that it differs from use in geometry and computer
 *   graphics, where coordinates of the form (x,y) are usually x units over, and y units down.
 *
 * Example rotation of a 4x4 matrix:
 *
 * var matrix = [
 *  [1,2,3,4],
 *  [5,6,7,8],
 *  [9,'A','B','C'],
 *  ['D','E','F','G']
 * ];
 * matrix[0][0]; // 1
 * matrix[3][2]; // 'F'
 *
 * var rotatedMatrix = rotateMatrix(matrix); // Rotate 90 degrees clockwise
 * // rotatedMatrix is:
 * [ ['D',9,5,1],
 *  ['E','A',6,2],
 *  ['F','B',7,3],
 *  ['G','C',8,4]
 * ]
 * rotatedMatrix[0][0]; // 'D'
 * rotatedMatrix[3][2]; // 8
 *
 * Extra credit:
 *  - Make your function operate on rectangular matrices (MxN rather than NxN).
 *  - Make your function accept a parameter for the direction of rotation (1 = clockwise, -1 = counterclockwise)
 */




function printMatrix(matrix) {
  var clean = matrix.map(function (row) {
    return row.join(',');
  }).join('\n');
  console.log(clean);
}
//  0 1 2
// [1,2,3] 0
// [4,5,6] 1
// rotate clockWise:
// [4, 1]
// [5, 2]
// [6, 3]
// y becomes the x and smaller ones in back (unshift)
// x becomes the y and smaller ones in front (push)
// 
// counterClockWise:
// [3, 6]
// [2, 5]
// [1, 4]
// y becomes the x and smaller ones in front (push)
// x becomes the y and smaller ones in back (unshift)

//loop through the matrix row by row, make a new row (array) for each cell by using cell's index as row number in the new matrix
//then if clockWise then unshift cell into the new row, and then push the new row
//
//maybe should get newRowIndex to get the row first (determined by if it is clock or counter clock wise and current cell index in sub array)


function rotateMatrix (matrix, clockwise = true) {
  let oldRowLastIndex = (matrix[0] || []).length - 1;
  return matrix.reduce( (newMatrix, oldRow) => {
    oldRow.forEach((cell, oldXIndex) => {
      //if clockwise the new Y would be the oldX's index
      //if counter clock wise the new Y would the oldRow.length - 1 - oldX's index
      let newYIndex = clockwise ? oldXIndex : oldRowLastIndex - oldXIndex;
      newMatrix[newYIndex] = newMatrix[newYIndex] || [];
      clockWise ? newMatrix[newYIndex].unshift(cell) : newMatrix[newYIndex].push(cell);
    });
    return newMatrix;
  }, []);
}

var matrix = [
[1,2,3,4],
[5,6,7,8],
[9,'A','B','C'],
['D','E','F','G']
];
matrix[0][0]; // 1
matrix[3][2]; // 'F'

var rotatedMatrix = rotateMatrix(matrix); 
