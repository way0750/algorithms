/**
 * Write a function that, given a string, Finds the longest run of identical
 * characters and returns an array containing the start and end indices of
 * that run. If there are two runs of equal length, return the first one.
 * For example:
 *
 *   longestRun("abbbcc") // [1, 3]
 *   longestRun("aabbc")  // [0, 1]
 *   longestRun("abcd")   // [0, 0]
 *
 * Try your function with long, random strings to make sure it handles large
 * inputs well.
 *
 * gonna need something to keep track of 
 * curRunAmount = 0, it's start and end index
 * curChar to compare to
 * curRun to compare to
 *
 * if char at index is different than curChar
 * then count curRun and compare with curRunAmount, larger than change curRunAmount, start and end index.
 * if not then start new curChar, and curRun
 * 
 */



