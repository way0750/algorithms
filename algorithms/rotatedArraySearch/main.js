/*
 * Given a sorted array that has been rotated some number of items right or
 * left, i.e. [0, 1, 2, 3, 4, 5, 6, 7] might become [4, 5, 6, 7, 0, 1, 2, 3]
 * how can you efficiently find an element? For simplicity, you can assume
 * that there are no duplicate elements in the array.
 *
 * rotatedArraySearch should return the index of the element if it is in the
 * array and should return null otherwise.
 *
 * For instance:
 * rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 2) === 5
 *
 * rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 100) === null
 *
 *
 * Target time complexity: O(log(array.length)) O(log(n))

   check and see if the array is actually rotated?
   if yes then turn it back to a sorted array?
   that would take n for going throught the array, another n for rotating it
   then log n for binary search
   so 2N + logN

   or logN

   another way:
   straight using binary search
   if found return the index
   if not then do one of the following:
   left side is it sorted and target within it?
     if yes, then search this portion
   right side is it sorted and target within it?
     if yes, then search this portion
   left side is it not sorted?
     if yes, then target might be in there search it
   right side is it not sorted?
     if yes, then target might be in there search it
   else return null;

   using binary search to find it?
   base case min > max reutrn null
       min === max return array[max] === target
   how to make problem smaller: pass in same array but different min max
   what to return always: number or null
   what to do with returns: just return it

   should write helper function to get min mid max
   should write helper function to check if left side right side sorted or not?
 */

let getMidIndex = function(minIndex, maxIndex) {
  return Math.ceil((maxIndex - minIndex) / 2) + minIndex;
}

let getArrayStat = function(array, targetValue, minIndex, midIndex, maxIndex) {
  return {
    leftSortedWithTarget: array[minIndex] <= targetValue && targetValue <= array[midIndex],
    rightSortedWithTarget: array[midIndex] <= targetValue && targetValue <= array[maxIndex],
    leftRotated: array[minIndex] > array[midIndex],
    rightRotated: array[midIndex] > array[maxIndex],
  };
};

let searchRotatedArray = function(array, target, minIndex = 0, maxIndex = array.length - 1) {
  console.log(minIndex, maxIndex)
  if (minIndex > maxIndex) return null;
  if (minIndex === maxIndex) return array[minIndex] === target;

  let midIndex = getMidIndex(minIndex, maxIndex);

  let arrayStat = getArrayStat(array, target, minIndex, midIndex, maxIndex);
  if (arrayStat.leftSortedWithTarget) {
    return searchRotatedArray(array, target, minIndex, midIndex - 1);
  } else if (arrayStat.rightSortedWithTarget) {
    return searchRotatedArray(array, target, midIndex + 1, maxIndex);
  } else if (arrayStat.leftRotated) {
    return searchRotatedArray(array, target, minIndex, midIndex - 1);
  } else if (arrayStat.rightRotated) {
    return searchRotatedArray(array, target, midIndex + 1, maxIndex);
  } else {
    return null;
  }
};
