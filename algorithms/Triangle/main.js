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
