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



//use recursion? and pass in the start and end index?
//get character at start index, make range: [startIndex, startIndex] then compare to sub sequence ones
//if the same update the range
//if not then recursive call
//but what if the input is super long, then it will cause stack overflow

//use interactive way to do this:
//same as recursion, but let curLongest = [index, index], and tempRun = [index, index];

let longestRun = str => {
  let curLongest = [-Infinity, -Infinity];
  let curRun = [-Infinity, -Infinity];
  let curChar = '';
  for (let i = 0; i <= str.length; i++){
    if (str[i] !== curChar) {
      curLongest = curLongest[1] - curLongest[0] >= curRun[1] - curRun[0] ? curLongest : curRun;
      curRun = [i, i];
      curChar = str[i];
    } else {
      curRun[1] = i;
    }
  }
  return curLongest;
};

let randomString = function (len) {
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz";

  for(let i = 0; i < len; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

let str = randomString(10);

longestRun(str);
