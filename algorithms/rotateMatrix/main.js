/*
   rotate a matrix in place

   to switch value inplace, ex:
   let a = 87;
   let b = 56;
   b += a // b = 143
   a = b - a // a = 56
   b -= a // b = 87

   to rotate in any direction, you will need three helper functions:
   flipUp, flipLeft, flipDiagonal (downward from top left to bottom right)
   to rotate 90 degrees: flipUp, the flipDiagonal
   the flipping will be done by switch value like above

 */

let rotateMatrixInPlace = (matrix, degree = 90) => {
  matrix = matrix.map((arr) => arr.slice());

  let flipVertical = (matrix) => {
    let rowLength = matrix.length;
    for (let y = 0; y < Math.floor(rowLength/2); y++) {
      let targetY = rowLength - (y + 1);
      for (let x = 0; x < matrix.length; x++) {
        matrix[targetY][x] += matrix[y][x];
        matrix[y][x] = matrix[targetY][x] - matrix[y][x];
        matrix[targetY][x] -= matrix[y][x];
      }
    }
    return matrix;
  };

  let flipHorizontal = (matrix) => {
    let colLength = matrix.length;
    for (let x = 0; x < Math.floor(colLength/2); x++) {
      let targetX = colLength - (x + 1);
      for (let y = 0; y < matrix.length; y++) {
        matrix[y][targetX] += matrix[y][x];
        matrix[y][x] = matrix[y][targetX] - matrix[y][x];
        matrix[y][targetX] -= matrix[y][x];
      }
    }
    return matrix;
  };

  let flipDiagonal = (matrix) => {
    let rowLength = matrix.length;
    for (let y = 0; y < Math.ceil(rowLength/2); y++) {
      for (let x = y + 1; x < matrix.length; x++) {
        matrix[y][x] += matrix[x][y];
        matrix[x][y] = matrix[y][x] - matrix[x][y];
        matrix[y][x] -= matrix[x][y];
      }
    }
    return matrix;
  };

  switch ((360 + degree) % 360) {
    case 90:
      return flipDiagonal(flipVertical(matrix));
    case 180:
      return flipVertical(flipHorizontal(matrix));
    case 270:
      return flipDiagonal(flipHorizontal(matrix));
    default:
      return matrix;
  }
}
