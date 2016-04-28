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

var index = binarySearch([1, 2, 3, 4, 5], 4);
console.log(index); // [3]



 
// var binarySearch = function (array, target) {
//   var minIndex = 0, maxIndex = array.length-1, midIndex = Math.floor(array.length/2);

//   while (minIndex !== maxIndex){
//     var curValue = array[midIndex];
//     if (curValue === target){
//       return midIndex;
//     } else {
//       // compare with midIndex with min and max index
//       if (curValue<target){
//         minIndex = midIndex;
//         midIndex = midIndex + Math.ceil((maxIndex - minIndex)/2);
//       } else {
//         maxIndex = midIndex;
//         midIndex = minIndex + Math.ceil((maxIndex - minIndex)/2);
//       }
//     }
//   }
//   return -1;

// };
