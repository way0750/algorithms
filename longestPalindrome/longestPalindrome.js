/**
* Implement a function that finds the longest palindrome in a given string.
* For example, in the string "My dad is a racecar athlete", the longest
* palindrome is "a racecar a". Count whitespaces as valid characters. Other
* palindromes in the above string include "dad", "ete", " dad " (including
* whitespace on each side of dad).
*/

var longestPalindrome = function (string) {
  var pali = '';
  var curLongest = 0;
  var curStr = '';
  for (var i = 0; i < string.length; i++) {
    var incr = 0;
    while (string[i-incr] === string[i+incr] && string[i-incr]){
      var o=string[i+incr];
      var n=string[i-incr];
      var e = string[i-incr] === string[i+incr];
      incr++;
    }
    curStr = string.substring(i-incr-1, i+incr);
    if (curStr.length > curLongest) {
      pali = curStr;
      curLongest = pali.length;
    }
  }
  return pali;
};
