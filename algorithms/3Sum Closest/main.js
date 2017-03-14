/*
Given an array S of n integers, find three integers in S such that the sum is
   closest to a given number, target. Return the sum of the three integers.
   You may assume that each input would have exactly one solution.

  For example, given array S = {-1 2 1 -4}, and target = 1.
  The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

*/

/*
  a naiv solution would be to find all possible combos and update the the array
   and the current min then return it

   loop from left to right until length - 2 because there wouldn't be enough
   numbers to create an array of 3 numbers

   then loop from current index + 1 to length - 1
     and loop from current index + 2 to length - 2
     check sum here and update min and the return array
   this will take n ^ 3 for time
   and O(1) for space
*/

let getDiff = function(n1, n2) {
  return n1 > n2 ? n1 - n2 : n2 - n1;
}

let sum3 = function(arr, target) {
  let min = Number.MAX_SAFE_INTEGER;
  let numArr = [];
  for (let a = 0; a < arr.length - 2; a++) {
    for (let b = a + 1; b < arr.length - 1; b++) {
      for (let c = b + 1; c < arr.length; c++) {
        let sum =  arr[a] + arr[b] + arr[c];
        let diff = getDiff(sum, min);
        if (diff < min) {
          min = diff;
          numArr = [arr[a], arr[b], arr[c]];
        }
        if (diff === 0) return numArr;
      }
    }
  }
  return numArr;
}

it('works?', function() {
  let arr = [-1, 2, 1, -4];
  let result = [-1, 2, 1];
  sum3(arr, 1).should.deep.equal(result);
});
