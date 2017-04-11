/*
You are a professional robber planning to rob houses along a street. Each house
   has a certain amount of money stashed, the only constraint stopping you from
   robbing each of them is that adjacent houses have security system connected
   and it will automatically contact the police if two adjacent houses were
   broken into on the same night.

Given a list of non-negative integers representing the amount of money of each
   house, determine the maximum amount of money you can rob tonight without
   alerting the police.

   if [2,8,5,6,7,3,9]
   return 24

   how to build cases: from end to front
   9 then 3,9, then 7,3,9, then 6,7,3,9 etc...
   for each case search all patterns:
     if 7,3,9 there will only be 2 possible patterns
     ignore 7 and find max in 3,9
       and the sum is 0 + 9 = 9
     or take out 7,3(first element,7, would be the number to keep track of),
       and find max in 9
       and the sum is 7 + 9 = 16
     so the max sum is 16, assign [7,3,9] to the table with value 16

   this is going to be resursive:
   base case: input array has value in record already, return it
     or input array has no length return 0
   what to return always: a number, which is the max number for a pattern
   what to do with two returns: depend which pattern you are going with
     sum current number 0 or array[0] with return, see which one is largest
     save input array as key and max as value to record return max;
   how to make problem smaller:
     slice(1); ignoring first element
     slice(2); taking first element but ignoring second element
*/
