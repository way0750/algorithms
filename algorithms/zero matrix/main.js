/*
   Write an algorithm such that if an element in an MxN matrix is 0, its entire
   row and column are set to 0.

   set three arrays all the the length of a sub array in the matrix
   allZeros to all zeros 
   patialZero to all 1s
   an empty array

   loop through each sub array map the zeros onto the partialZero
   if a zero is found, then at the end push allZeros to the empty array
     else push the patialZero array
   since either case all the arrays getting pushed into the empty array
   are all refering to the same ones, so if there are updated later, it would be
   updated instantly

   at the end, loop through the 'empty array' to map each sub array to
   slicing of the refered one
*/
let zeroMatrix = (matrix) => {
  let allZeros = Array(matrix[0].length).fill(0);
  let partialZeros = Array(matrix[0].length).fill(1);
  return matrix.reduce((arr, subArr) => {
    let hasZero = false;
    subArr.forEach((num, i) => {
      if (num === 0) {
        partialZeros[i] = 0;
        hasZero = true;
      }
    });

    arr.push(hasZero ? allZeros : partialZeros);
    return arr;
  }, []);
}

/*
   time and space
   time:
   matrix size is n * m
   looping through it is n * m
   making allZeros and partialZeros are 2m
   making the final array is n
   so total n * m + 2m + n
   drop the non-dominent terms: n * m

   space allZeros and partialZeros are 2m
   the final array is n * m
   so n * m + 2m, drop the non-dominent: n * m
 */
