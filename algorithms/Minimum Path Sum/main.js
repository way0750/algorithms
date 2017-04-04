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
   the path is [1, 9, 0, 4, 2, 4, 3];
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

let pathMinSum = function(grid) {
  let table = {['0:-1']: 0, ['-1:0']: 0};

  let callValueAt = (y, x) => {
    return table.hasOwnProperty(`${y}:${x}`) ? table[`${y}:${x}`] : Infinity;
  };

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      let topCell = callValueAt(y - 1, x);
      let leftCell = callValueAt(y, x - 1);
      table[`${y}:${x}`] = cell + Math.min(topCell, leftCell);
    });
  });

  let height = grid.length - 1;
  let width = (grid[0] || []).length -1;

  // get the path
  // go from first to last cell by iterating m + n times
  // compare right and bottom from the table;
  let path = [];
  let curY = height+1;
  let curX = width;
  for (let i = 0; i <= height + width; i++) {
    let left = callValueAt(curY, curX-1);
    let top = callValueAt(curY-1, curX);
    if (left < top) {
      path.unshift(grid[curY][curX-1]);
      curX--;
    } else {
      path.unshift(grid[curY-1][curX]);
      curY--;
    }
  }

  console.log(
    'this is the path from top left to bottom right: \n',
    JSON.stringify(path)
  );

  return table[`${height}:${width}`];
};

qt(function() {
  let grid = [
    [1, 4, 5, 8],
    [9, 8, 5, 3],
    [0, 4, 2, 9],
    [9, 6, 4, 3],
  ];

  pathMinSum(grid).should.equal(23);
});
