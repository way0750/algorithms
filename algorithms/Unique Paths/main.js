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

   pseudo code:

   set cache to an object
   then loop through each row
     set y to current row index;
     for each row loop through each cell:
       set x to current cell index;
       set key to putting x and y together
       set value to null;
       for each cell, if the x or y is 0, then set value to 0
       else get value from top and left:
         top: x:y-1
         left: x-1:y
         add them together and assign it to value
       add key and value to cache

   then return cache at x.length-1:y.length-1
*/

// dynamic programming
let uniquePaths = function(grid) {
  let table = grid.reduce((record, row, y) => {
    row.forEach((_, x) => {
      let key = `${x}:${y}`;
      let value;
      if (y === 0 || x === 0) {
        value = 1;
      } else {
        let top = record[`${x}:${y-1}`];
        let left = record[`${x-1}:${y}`];
        value = top + left;
      }
      record[key] = value
    });

    return record;
  }, {});

  let y = grid.length - 1;
  let x = y > 0 ? grid[0].length - 1 : -1;

  return table[`${x}:${y}`] || 0;
};

// recursion with memoization
/*
   base case: when hit x.length -1 or y.length -1
     return 1;
     if current x:y is found in cache, return it
   how to make problem smaller:
     increase x by 1, recursively call
     increase y by 1, recursively call
   what to return: a number which is the amount of ways
   what to do with the return: add them up, add them to cache
     then return the them;
*/

let uniquePathsNotWorking = function(grid, x = 0, y = 0, cache = {}) {
  let key = `${x}${y}`;
  if (cache.hasOwnProperty(key)) return cache[key];
  let xOutOfBound = (grid[0] || []).length <= x;
  let yOutOfBound = (grid).length <= y;
  if (xOutOfBound || yOutOfBound) return 0;

  let atLastCol = (grid[0] || []).length - 1 === x;
  let atLastRow = (grid).length - 1 === y;
  if (atLastCol || atLastRow) {
    cache[key] = 1;
    return 1;
  }

  let value = 0;
  // go right, and go down
  value += uniquePaths(grid, x + 1, y, cache);
  value += uniquePaths(grid, x, y + 1, cache);

  cache[key] = value;
  return value;
}
