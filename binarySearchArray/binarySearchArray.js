/*
 * Given a sorted array, find the index of an element
 * using a binary search algorithm.
 *
 * Example usage:
 *
 * var index = binarySearch([1, 2, 3, 4, 5], 4);
 * console.log(index); // [3]
 */

// set min, max, and mid index
// if mid index isn't target then compare and reset min or max
// if mid index is target value then return index.
// after a while, if min === max then return -1
// 
// [a,b,c,d,e]
// 0,1,2,3,4
// min = 0, max=4, mid = 2



function binarySearch(array, target) {
  var min = 0;
  var max = array.length - 1;
  while (min <= max){
    var mid = min + Math.floor( (max - min) / 2 );
    if (array[mid] === target) {
      return mid;
    } else if (array[mid] > target) {
      max = mid - 1;
    } else if (array[mid] < target) {
      min = mid + 1;
    }
  }
  return -1;
}

//using recursion
function binarySearch (array, target, min, max) {
  if (min === undefined) {
    min = 0;
  }
  if (max === undefined) {
    max = array.length - 1;
  }
  if (min > max) {
    return -1;
  }
  var mid = min + Math.floor( (max - min) / 2 );
  if (array[mid] === target) {
    return mid;
  } else if (array[mid] > target) {
    return binarySearch(array, target, min, mid - 1);
  } else if (array[mid] < target) {
    return binarySearch(array, target, mid + 1, max);
  }

}

var index = binarySearch([1, 2, 3, 4, 5], 4);
console.log(index); // [3]
