/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in
   the diagram below).

The robot can only move either down or right at any point in time. The robot is
   trying to reach the bottom-right corner of the grid (marked 'Finish' in the
   diagram below).

How many possible unique paths are there?

   if 4 by 4
  s_ _ _ _
   _ _ _ _
   _ _ _ _
   _ _ _ _e

   because the robot can only move right and down
   so one thing for sure is that:
  s_ _ _ 1
   _ _ _ 1
   _ _ _ 1
   1 1 1 1e

   now 
  s_ _ _ 1
   _ _ _ 1
   4 3 2 1   4 3 2 because for 2, when go right there is 1 way, when go down there is only 1 so total of 2
   1 1 1 1e   3 and 4, same reason basically just add the value that is to the right and down, that is the total paths

   but if you flip it it will be easier to get those 1s: if x or y is 0 then value is 0
   else get the value by add top and right (instead of bototm and left)
  s1 1 1 1
   1 _ _ _
   1 _ _ _
   1 _ _ _e

   maybe should add the values to a cache(dynamic programming right?) by x:y => value

   time and space:
   time: m * n, you are going through all cells;
   space: you are creating a new cache that is the same size as the matrix/grid
     so m * n
*/
