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
*/
