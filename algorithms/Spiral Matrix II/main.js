/*
   Spiral Matrix II
   Given an integer n, generate a square matrix filled with elements from 1 to
   n2 in spiral order.

For example,
Given n = 3,

You should return the following matrix:
[
 [ 1, 2, 3 ],
 [ 8, 9, 4 ],
 [ 7, 6, 5 ]
]

   Remember how you print cells in a spiral order?
   Shift and pop the first and last line, then loop through the remaining matrix
   To get the right side and left side

   so you can do something similar: build the outter ring by adding numbers to
   top, then right, then bottom, then left
   and build another ring

   when finally done
   you set an empty array, add the inner most ring to it by:
   looping through the array, and unshift the left of current ring
      push the right of current ring
      to each sub array, add if there isn't any
   then unshift the top and push the bottom of current ring
*/
