/*
 * Write a function that accepts a 2-dimensional array (that is, an array containing many same-length arrays),
 * and prints out every value found, but in a spiral from the upper left in to the center
 * Please write some form of specs, tests, or assertions for your code, and check as many edge cases as you can think of
 *
 * example:

    spiralTraversal([
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ]);

    returns [1, 2, 3, 6, 9, 8, 7, 4, 5]
 */

//divide the problem into two: how to vertical go up and down, and how to go horizontally left and right
//
//for going up and down
//set rowStart to 0, rowEnd to length-1 (using this as index)
//set goDown to true
//while loop rowStart <= rowEnd
//  if doDown is true 
//    for loop from rowStart to rowEnd
//    when done rowStart - 1 rowEnd + 1, 
//    do things with each col
//    set doDown to false
//  if doDown is false
//    for loop from rowEnd to rowStart
//    set doDown to true

let arr = [
[ 1, 2, 3, 4],
[ 5, 6, 7, 8],
[ 9,10,11,12],
[13,14,15,16]
];

//  this version still needs work
//
//
// let traverlsal = (arr, callBack) => {
//   let rowStart = 0, rowEnd = arr.length - 1;
//   let colStart = 0, colEnd = arr[0] ? arr[0].length - 1 : 0;
//   let goDown = true;
//   while (rowStart <= rowEnd) {
//     if (goDown) {
//       for (let i = rowStart; i < rowEnd; i++) {
//         if (i === rowStart) {
//           for (let j = colStart; j <= colEnd; j++){
//             callBack(arr[i][j]);
//           }
//         } else {
//           callBack(arr[i][colEnd]);
//         }
//       }
//       goDown = false;
//     } else {
//       console.log('going up')
//       for (let i = rowEnd; i > rowStart; i--){
//         if (i === rowEnd) {
//           console.log('last row')
//           for (let j = colEnd; j >= colStart; j--){
//             callBack(arr[i][j]);
//           }
//         } else {
//           console.log('first col')
//           callBack(arr[i][rowStart]);
//         }
//       }
//       goDown = true;
//       rowStart++;
//       rowEnd--;
//       colStart++;
//       colEnd--;
//     }
//   }
// };

// traverlsal(arr, console.log);



//this version works:

var spiralTraversal = function(matrix){
  if (matrix.length<2){
    return matrix.length === 0 ? matrix : matrix[0];
  }

  var copyArr = matrix.slice();
  var p1, p3;
  var p2 = [], p4 = [];
  p1 = copyArr.shift();
  p3 = copyArr.pop().reverse();
  var curArr;
  var newMatrix = [];
  for (var i = 0; i < copyArr.length; i++) {
    curArr = copyArr[i];
    p2.push(curArr.pop());
    if(curArr.length){
      p4.unshift(curArr.shift());
    }
    if(curArr.length){
      newMatrix.push(curArr);
    }
  }

  return p1.concat(p2, p3, p4, spiralTraversal(newMatrix));

};
