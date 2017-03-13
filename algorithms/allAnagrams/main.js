/**
 * Given a single input string, write a function that produces all possible
 * anagrams
 * of a string and outputs them as an array. At first, don't worry about
 * repeated strings.  What time complexity is your solution?
 *
 * Extra credit: Deduplicate your return array without using uniq().
 */

/**
 * example usage:
 * var anagrams = allAnagrams('abc');
 * console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
   so basically permutations on input
 */


/*
   given a strin as input, then produce all permutations and output in array
   abc
   a: a
   b: ba, ab // place b in all possibel position, front mid and end
   c: cba, bca, bac, cab, acb, abc // place c in all possible possible position
     in ba, then in ab
   so the basic idea is for each and every sub permutation, insert a new letter
   to its every position
   for example: if so we have 'a' as sub permutation, we will enter b to each
   position: ba then ab

   pseudo code:
   if using recursion:
   base case: input is empty string: return  ['']; symbolize as have one and only
     permutation
   how to make problem smaller: slice string smaller and smaller, eventually it
     will become an empty string
   what to return always: an array, which is an array of strings aka permutations
   what to do with those returns: for each string in the returned array, add
     current char to each positon in the string, which yields a new permutation

   time and space complexity
     time:
     ''
      'a' 1
       'ab' 'ba' 2
       'cab' ' acb' ' abc' 'cba' 'bca' 'bac' 6
        '4 new permutations for each'
   (last length + 1) * last amount
   so 6 * (4) = 24?
   last amount * (depth) === amount at depth

   1 * (1 +0 ) = 1
   1 * ( 2 ) = 2
   2 * (3) = 6
   6 * (4) = 24
   total = 1 + 2 + 6 + 24 = 33
   (((1 * (1)) * ( 2 )) * (3)) * (4)
   so basically !depth? to get the last depth that is
   1 * 1 * 2 * 3 * 4
   !1 + !2 + !3 + !4 + !5 + !n

   depth = n
   -------
   <        !depth
   ------
   depth = 1

   but you have to go through all the return permutations to create new ones

   depth = n - 1
   -------
   <        !depth
   ------
   depth = 1

   put the together, drop the constant, you end up with:

   depth = n
   -------
   <        !depth
   ------
   depth = 1

   space complexity
   will be !depth amount of permuatation eventually, so !depth
   + the stack size which is depth, but it is non dominent, so drop it
   you end up with !depth

   if doing this in an iteractive way, then the time and space will be the same
 */

let makePermute = function(char, string, callBack, curPostion = 0) {
  if (curPostion > string.length) return;
  let leftStr = string.slice(0, curPostion);
  let rightStr = string.slice(curPostion);
  callBack(leftStr + char + rightStr);
  makePermute(char, string, callBack, curPostion + 1);
};


let allAnagrams = function(str) {
  if (!str.length) return [''];
  let subPermutes = allAnagrams(str.slice(1));
  let char = str[0];
  // new permutes:
  return subPermutes.reduce((allPermutes, subPermute) => {
    makePermute(char, subPermute, (newPermute) => { allPermutes.push(newPermute); });
    return allPermutes
  }, []);
}

console.log(allAnagrams('abcd'));
