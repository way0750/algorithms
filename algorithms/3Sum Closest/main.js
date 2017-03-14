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

let sum3Working = function(arr, target) {
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
};

/*
   other people's solution: sort the array then get use two pointers to go from
   both side to get close to a pair of numbers that can be summed to or get
   closer to target num

   why doesn't it work?
   for example:
   arr = [3,5,7,8,2,3,9,0]
   sort: [0,2,3,3,5,7,8,9];
   target is 12 which is chosen from 5 and 7 in the array
   which mean there is a pair of numbers in the array that can sum up to 12
   if there is a pair of numbers that can be summed up to 12, you can find them
   by going through the sorted array from left to right
     move left pointer to right if current left + current right is smaller than
     target, or move right pointer if sum is larger than target

   think of it as "zeroing in like binary search"

   and it is scalable to find any number of digits to find a target number
   as long as you move as little as possible to zero in
   A B C    D E F
   move the inner digits first and move the outer
   C D, then B E, then A F
   if larger than target: move the left set
   if smaller than target: move the right set

   solution doesn't work when it is 3 numbers:
   let arr = [1,3,6,8,10,20,30,44,57,88];
   let target = 57;
   can't find it

   but we can iterate through the input array once, for each
     iteration, do the zero in thing

   time: n for interating through array, n log n for sorting
   then n for the zero-in operation for each ineration
     n * n + n log n
   which is n^2
   space: need an array of 3 elements at worst so O(1)
   but if need to slice input array to avoid mutating it
     then that would be n

   so the whole zeroing in thing work only for 2 variables?
*/

let sum3WithTarget = function(numArr, target) {
  let arr = numArr.slice().sort((n1, n2) => +n1 >= +n2);
  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
      let sum = arr[i] + arr[left] + arr[right];
      if (sum === target) return [arr[i], arr[left], arr[right]];
      sum < target ? left++ : right--;
    }
  }
  return [];
}

it('does it really work?', function() {
  let arr = [1,3,6,8,10,20,30,44,57,88];
  let target = 57;
  sum3WithTarget(arr, target).should.deep.equal([3, 10, 44]);
});

let numSum = (arr) => arr.reduce((sum, num) => sum + num);

let sum3Closest = function(numArr, target) {
  let arr = numArr.slice().sort((n1, n2) => +n1 >= +n2);
  let min = Number.MAX_SAFE_INTEGER;
  let comboArr = [];

  for (let i = 0; i < arr.length - 2; i++) {
    let left = i + 1;
    let right = arr.length - 1;

    while (left < right) {
      let arr3 = [arr[i], arr[left], arr[right]];
      let sum = numSum(arr3);
      let diff = getDiff(sum, target);

      if (diff === 0) {
        return arr3;
      } else if (diff < min) {
        min = diff;
        comboArr = arr3;
      }

      sum < target ? left++ : right--;
    }
  }
  return comboArr;
};

it('sum3Closest', function() {
  let arr = [ -1, 2, 1, -4 ];
  let target = 1;
  sum3Closest(arr, target).should.deep.equal([-1, 1, 2]);
});

it('sum3Closest', function() {
  let arr = [ -1, 2, 1, -4 ];
  let target = -3;
  sum3Closest(arr, target).should.deep.equal([-4, -1, 2]);
});
