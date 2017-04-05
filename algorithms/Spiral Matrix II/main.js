/*
   Spiral Matrix II
   Given an integer n, generate a square matrix filled with elements from 1 to
   n2 in spiral order.

For example,
Given n = 3,

You should return the following matrix:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]

   Remember how you print cells in a spiral order?
   Shift and pop the first and last line, then loop through the remaining matrix
   To get the right side and left side

   so you can do something similar: build the outter ring by adding numbers to
   top, then right, then bottom, then left
   and build another ring

   when finally done
   you set an empty array, add the inner most ring to it by:
   looping through the array, and unshift the left of current ring
      push the right of current ring
      to each sub array, add if there isn't any
   then unshift the top and push the bottom of current ring
*/

let makeSpiralMatrix = function(size) {
  let rings = [];
  let currentNum = 1;
  for (let ringDepth = 0; ringDepth < Math.ceil(size/2); ringDepth++) {
    let ring = { top: [], bottom: [], left: [], right: [] };
    let verticalSize = size - (ringDepth * 2);
    // it is the size - the top and bottom
    let sideSize = Math.max(verticalSize - 2, 0);
    for (let n = 0; n < verticalSize; n++) {
      ring.top.push(currentNum++);
    }
    for (let n = 0; n < sideSize; n++) {
      ring.right.push(currentNum++);
    }
    for (let n = 0; n < verticalSize && currentNum <= size * size; n++) {
      ring.bottom.unshift(currentNum++);
    }
    for (let n = 0; n < sideSize; n++) {
      ring.left.unshift(currentNum++);
    }

    rings.unshift(ring);
  }

  // put them together
  return rings.reduce((matrix, ring) => {
    let leftSide = ring.left;
    leftSide.forEach((leftNum, index) => {
      matrix[index] = matrix[index] || [];
      matrix[index].unshift(leftNum);
      matrix[index].push(ring.right[index]);
    });

    matrix.unshift(ring.top);
    if (ring.bottom.length) matrix.push(ring.bottom);
    return matrix;
  }, []);
}
