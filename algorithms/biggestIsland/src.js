/*
  give a 2-D array of 1s and 0s
  1 means land
  0 means water

  1 also means that is an island of size
  if other 1s are connect horizontally or vertically
  that collectively count as 1 island of larger size(amount of 1s)

  find the largest island, return its size
    if no island then return 0

  solution 1:
    loop through the cells and mark the cell as visited,
      whenever run into a 1 then recursively check vertical and horizontal cells
      that are no visited and also is 1s
        if already visited or 0 then stop
        else continue
        when finally return, return all the sub-size + 1(current part of island)
      compare and update the current largest island variable


    the recursion:
    base case:
      if out of bound/cell value === 0 /already visited, return 0
    how to make it smaller:
      there are only 4 directions to go/expand recursively call with each of those
      4 directions
    what to return
      data type: number representing the found size of an island
    what to do about return
      add all of them together + 1
 */



function findLargestIsland(matrix) {
  let exploredCells = {};
  let curLargestIsland = 0;
  const visited = 'visited';
  matrix.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const coordinate = `${rowIndex}+${colIndex}`;
      if (exploredCells[coordinate] !== visited && cell === 1) {
        const thisIslandSize = exploreIsland(rowIndex, colIndex);
        curLargestIsland = Math.max(curLargestIsland, thisIslandSize);
      }
    });
  });

  function exploreIsland(row, col) {
    const isRowOutOfBound = row < 0 || row >= matrix.length;
    const isColOutOfBound = col < 0 || col >= matrix[0].length;
    if (isRowOutOfBound || isColOutOfBound) {
      return 0;
    }

    const curCellIsWater = matrix[row][col] === 0;
    const isCurCellVisited = exploredCells[`${row}+${col}`] === visited;
    if (curCellIsWater || isCurCellVisited) {
      return 0;
    }

    exploredCells[`${row}+${col}`] = visited;

    const directionsToVisit = [
      [row+1, col], // go up
      [row-1, col], // go down
      [row, col+1], // go right
      [row, col-1]  // go left
    ];

    const totalSize = directionsToVisit.reduce((curIslandSize, [row, col]) => {
      return curIslandSize + exploreIsland(row, col);
    }, 1);
    return totalSize;
  }

  return curLargestIsland;
}


const earth = [
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,1,0,1,0,0,0,0,0,0,0],
  [0,1,0,1,0,0,0,0,0,0,0],
  [0,0,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,0,0,0,0],
  [0,0,0,1,1,0,0,0,0,0,0],
]
// the largest is 8

findLargestIsland(earth);
