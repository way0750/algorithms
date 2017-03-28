/*
   given a m * n grid, each of its cell is fill with a positive integer
   find the minimum path sum from top left to bottom right
   you can only move right and bottom
   ex:
   [
     [1, 4, 5, 8],
     [9, 8, 5, 3],
     [0, 4, 2, 9],
     [9, 6, 4, 3],
   ];
   the minimum path sum is 23
   [
     [ 1,  5, 10, 18],
     [10, 13, 15, 18],
     [10, 14, 16, 25],
     [19, 20, 20, 23],
   ]
   start from top to bottom left to right
   add the minimum from top and left to current cell
   to deal with the first cell at 0:0
   add to table: {0:-1: 0, -1:0: 0}
   for all other cell when top or left is 0, use Inifity
*/
CalmProductive2017
