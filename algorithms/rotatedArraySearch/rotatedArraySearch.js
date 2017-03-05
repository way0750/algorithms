// input an sorted array of num that might be rotated, and a target num
// output index of target within the array or null if not found
// 
// if not rotated [4,5,6,7,8,9] target: 100, just check start and end of the array
// if target is within the range, find it using binary search, if not return null
// if it is rotated: can tell by comparing start and end of the array/range, if end is less than start then
//  it has to be rotated. Or at least the current range is
//  
// maybe should only search in a non-rotated range that over laps with the target
// or if that range doesn't exist, but a rotated range exist, then check that
// 
// using binary to search, there will be two ranges
//  for each one of them, need to ask: is it non-rotated and overlaps with target? or is it rotated
//  so 4 ifs?
//  
let rotatedArraySearch = (arr, target) => {
  let minIndex = 0; maxIndex = arr.length - 1;
  while (minIndex <= maxIndex) {
    let midIndex = Math.floor(minIndex + (maxIndex - minIndex)/2);
    if (arr[midIndex] === target) {
      return midIndex;
    } else {

      let leftRegularOrder = arr[minIndex] <= arr[midIndex];
      let leftHasTarget = target >= arr[minIndex] && target <= arr[midIndex];
      let rightRegularOrder = arr[midIndex] <= arr[maxIndex];
      let rightHasTarget = target >= arr[midIndex] && target <= arr[maxIndex];

      if (leftRegularOrder && leftHasTarget) {
        maxIndex = midIndex - 1;
      } else if (rightRegularOrder && rightHasTarget) {
        minIndex = minIndex + 1;
      } else if (leftRegularOrder === false) {
        maxIndex = midIndex - 1;
      } else if (rightRegularOrder === false){
        minIndex = minIndex + 1;
      } else {
        return null;
      }
    }
  }
  return null;
};

rotatedArraySearch([7, 8, 9, 0, 1, 2, 3, 4, 5, 6], 5);
