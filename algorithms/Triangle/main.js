/*
Given a triangle, find the minimum path sum from top to bottom. Each step you
   may move to adjacent numbers on the row below.

For example, given the following triangle
[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
The minimum path sum from top to bottom is 11 (i.e., 2 + 3 + 5 + 1 = 11).

   reduce backward, and for each sub array, come up with a new array that is
   size - 1 of the current sub array
   element of this new array should be the min between two subsequent numbers

   then for the next array, add both current array and the last min array
   together, by adding numbers of the same index
   then do the same thing to create a new array that is size -1 that current
   array

   eventually you will end up with an array of 1 element or none
   if 1 element, return it, if nothing then return Infinity
*/

// soooooo this is dynamic programming
/*
   time and space: if n is the amount of numbers
   n * 3 due to all the maps and array creation
   so n

   space: worst case you will end up with an array that is squart root
   of n
   of sqrt(n)
*/
let minPathWorking = function(triangle) {
  let min = triangle.reduceRight((subMinArr, curArr) => {
    let addedArr = curArr.map((_, i) => curArr[i] + (subMinArr[i] || 0));

    if (addedArr.length === 1) return addedArr;

    return Array(addedArr.length - 1)
      .fill(0)
      .map((_, i) => Math.min(addedArr[i], addedArr[i+1]));
  }, []);

  return min.length ? min[0] : Infinity;
};

/*
   using good old recursion
   wrap the recusive function since it will be returning arrays
   but eventually we want a number

   same logic as the above fold backward and return array of size - 1
   then higher index one

   base case: we will pass the triangle and current index
     if current index yields undefined, meaning we are at triangle[length]
     return an [], in case getting an empty triangle as input
   making problem smaller: simply pass current index + 1 to recursive call
   what to return: an array that is size -1 of the current one
   what to do with return:
     add both the return and current array by adding numbers of the same
     indexes;
     then make another array that is size -1 and return it
     unless the current array size is 1 already;
*/

let minPath = function(triangle, curIndex = 0) {
  if (!triangle.length) return Infinity;
  if (triangle.length <= curIndex) return Array(triangle.length).fill(0);

  let subMinArr = minPath(triangle, curIndex + 1);
  let curArr = triangle[curIndex];
  let addedArr = curArr.map((num, i) => num + subMinArr[i]);

  if (addedArr.length === 1) return addedArr[0]

  let minArr = Array(addedArr.length - 1)
    .fill(0)
    .map((_, i) => Math.min(addedArr[i], addedArr[i+1]));

  return minArr;
};
