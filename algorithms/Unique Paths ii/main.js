/*

  Now consider if some obstacles are added to the grids. How many unique paths
    would there be?

  An obstacle and empty space is marked as 1 and 0 respectively in the grid.

  For example,
  There is one obstacle in the middle of a 3x3 grid as illustrated below.

  [
    [0,0,0],
    [0,1,0],
    [0,0,0]
  ]
  The total number of unique paths is 2.

  do the same this time but without inverting the grid
  and set the table to default value { xlegnth: 1 } for the ending cell
   for each cell check and see if there is a mark there already
   if yes then value is 0;
   if no then calculate value by adding right + bottom and if nothing found use0

   at the end return value at index 00 or simply 0
*/

let uniquePathsII = function(grid){
  let xLength = (grid[0] || []).length;
  let yLength = (grid || []).length;
  let table = grid.reduceRight((record, row, y) => {
    for (let x = row.length - 1; x > -1; x--) {
      let key = `${x}:${y}`;
      let rightVal = record[`${x+1}:${y}`] || 0;
      let bottomVal = record[`${x}:${y+1}`] || 0;
      let value = row[x] === 'x' ? 0 : rightVal + bottomVal;
      record[key] = value;
    }
    return record;
  }, { [`${xLength}:${yLength-1}`]: 1 });

  return table['0:0'] || 0;
};
