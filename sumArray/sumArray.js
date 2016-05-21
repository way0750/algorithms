/*
 * Given an array of numbers, calculate the greatest contiguous sum of numbers in it.
 * A single array item will count as a contiguous sum.
 *
 * example 1: sumArray([1, 2, 3]); // => 6
 * example 2: sumArray([1, 2, 3, -4]); // 6
 * example 3: sumArray([1, 2, 3, -4, 5]); // 7
 * example 4: sumArray([4, -1, 5]); // => 8
 * example 5: sumArray([10, -11, 11]); // 11
 */

// Solved in O(n) time with O(1) memory

// [-1, -2, -3, 1,2,3, -4, 5, 6, - 4]
// 13
// 
// curLargest = [0] = -1
// curSum = [0] = -1;
// curNum = nothing
// for loop
//    if negative
//      pick the largest of the curLargest, curSum, curNum
//      reset curSum to curNum
//      
//    if positive 
//      reset curSum to this number if curSum is negative
//      if curSum is positive, simple += curNum 

function sumArray (arr) {
  let curLargest = arr[0] || -Infinity;
  let curSum = -Infinity;
  let curNum;
  for (let i = 0; i <= arr.length; i++){
    curNum = arr[i];
    if ((curNum || 0) <= 0) {
      curLargest = curNum > curLargest ? curNum : curLargest;
      curLargest = curSum > curLargest ? curSum : curLargest;
      curSum = curNum + curSum > 0 ? curNum + curSum : curNum; 
    } else {
      curSum = curSum < 0 ? curNum : curSum + curNum;
    }
  }
  return curLargest;
}

sumArray([-1, -2, -3, 3, 4, -6, 1, 2, 5, -9, 100]); 
