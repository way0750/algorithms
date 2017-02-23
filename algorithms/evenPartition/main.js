/*
   input an array of integers, return boolean for able to partition it into two
   array which share the same sum

   if odd, then it's not possible because having two array sharing same sum
   means when they are back in one array, the sum should be sum * 2 which
   should be an even number

   so sum the original array up, return false if it is odd number
   then get half of it

   {1,1,3,2,3,4}
   sum =14
   half = 7
   then do what?
   there might a need for cache
   {1,1,2,2,8}
   sum = 14
   half = 7
   btw this should be false;
   so now try to find a way to get a subset of integers which can be sumed to 7
   7 - 1 = 6
   [1,1,2,2,8]
   1 recursively: [1,2,2,8]: still needs 6
   1 recursively: [2,2,8]: still needs 5
   2 recursively: [2,8] // stops here and still needs 3
   check both numbers, and neither is equal to 3, so done and return false;

   so problem becomes: given a number: find a subset that can be summed to it
   and subset needs to be 1 element less that the master one

   if n: 5, [5] then nothing
   if [5,4] then yes
   so basically it is a recursive problem
   if n: 3 [1,2,3] then what?
   3 - 1 = 2 then check 2 against [2,3]

   if n: 5: [7,8,5];
   then 5 - 7 = -2, check -2 against [8,5], found nothing
   then try 5 - 8 = -3, check -3 against [7,5] found nothing
   then try 5 - 5 = 0, check 0 against [7,8] found nothing, but it is 0 so done

   input num - one of each number in the array, if equals to 0 done
   if not then that number out make new array, recursively call with that array and new num

   base case array length is 1 or less, return false;
   array length is 2, check and see if any one is the input number
   how to make it smaller, loop through input array "delete current num" and make new array
   let sum = input number - current number
   if sum is true, return true;
   if sum is found in cache return false;
   if sum is not found in the cache, add inputNum + newArray as key, and return as value
   what to return always: boolean
   what to do with boolean: just keep returning
 */



let evenPartition = function(array) {
  let masterSum = array.reduce((sum, num) => sum + num);
  if (masterSum % 2 === 1) return false;

  let subSum = masterSum / 2;
  let search = (num, array) => {
    if (array.length <= 1) return false;
    if (array.length === 2) return array[0] === num || array[1] === num;
    return array.some((n, i) => {
      let newSum = num - n;
      if (newSum === 0) return true;
      return search(newSum, array.slice(0, i).concat(array.slice(i + 1)));
    });
  };

  return search(subSum, array);
};
