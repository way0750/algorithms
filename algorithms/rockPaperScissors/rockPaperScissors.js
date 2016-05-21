
// input a number as round of rock paper scissor
// output all possible combos/permutations for those rounds

// each round you have three choice
// if one round then simply return [r, p, s]
// if more than one then add r p s to each of the r p s
// for example 2 rounds: rr rp rs pr pp ps sr sp ss
// use recursion
// base case is round === 0
//  return [[]];
// how to break smaller: round - 1
// what to return: always array of sub arrays
// what to do about the return:
//      a r to all subarray, save them, then same for p and s
function rockPaperScissor (round) {
  if (round === 0) {return [[]];}
  let subPermutes = rockPaperScissor(round - 1);
  return ['r', 's', 'p'].reduce ( (permutation, move) => {
    return permutation.concat( subPermutes.map( (arr) => {return arr.concat(move);} ));
  }, []);
}

rockPaperScissor(6);
