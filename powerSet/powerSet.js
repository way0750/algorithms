/*
 * Return an array with the power set of a given string.
 * Definition of power set: The set of all possible subsets including the empty set.
 *
 * Example:
 *
 * powerSet("abc")
 * -> [ '' , 'a', 'b', 'c', 'ab', 'ac', 'bc', 'abc' ]
 *
 * Note: 
 *  1. All characters in a subset should be sorted.
 *  2. Sets of the same characters are considered duplicates regardless of order and count only once, e.g. 'ab' and 'ba' are the same. 
 * 
 * Example 2 :
 * 
 * powerSet("jump")
 * -> ["", "j", "ju", "jm", "jp", "jmu", "jmp", "jpu", "jmpu", "u", "m", "p", "mu", "mp", "pu", "mpu"]
 */


//using recursion:
//base case: if input string is empty, return [ itself ];
//how to break smaller: loop from back of string to front and recursively call with str.slice(1);
//what to do with return: make copy of return array, add str[0] to each and every single one of the element in the copy arr
//  then concat both arrays together then return
//what to return: always an array;

var powerSet = (str) => {
  if (str === '') { return [str]; }
  return powerSet(str.slice(1)).reduce( (finalSet, strSet) => {
    return finalSet.concat(strSet, str[0] + strSet);
  }, []);
};

powerSet("jump");
