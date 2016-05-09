/**
* Implement a function that finds the longest palindrome in a given string.
* For example, in the string "My dad is a racecar athlete", the longest
* palindrome is "a racecar a". Count whitespaces as valid characters. Other
* palindromes in the above string include "dad", "ete", " dad " (including
* whitespace on each side of dad).
*/

// input a string
// output the longest palindrome substring

// go through each character in the string, then expand in both directions stop if characters on both end ain't the same
// count the length of the sub string
//  if longer than current palindrome, then update current palindrome
// also there two types of palindrome:   'bab' 'baab'
// so have to expand twice

function longestPalindrome(str) {
  let curLongestPali = '';
  let expandWidth, pali = "";
  let leftChar, rightChar;

  function findPaliAtIndex(curIndex, str, leftIndex, rightIndex) {
    let pali = rightIndex - leftIndex === 1 ? '' : str[curIndex];
    let expandWidth = 0;
    let leftChar = str[leftIndex - expandWidth];
    let rightChar = str[rightIndex + expandWidth];
    while ((leftChar && rightChar) && (leftChar === rightChar)){
      pali = leftChar + pali + rightChar;
      expandWidth++;
      leftChar = str[leftIndex - expandWidth];
      rightChar = str[rightIndex + expandWidth];
    }
    return pali;
  }

  let oddLengthPali, evenLengthPali;
  for (let i = 0; i < str.length; i++){
    oddLengthPali = findPaliAtIndex(i, str, i - 1, i + 1);
    if (oddLengthPali.length > curLongestPali.length) {
      curLongestPali = oddLengthPali;
    }
    evenLengthPali = findPaliAtIndex(i, str, i, i + 1);
    if (evenLengthPali.length > curLongestPali.length) {
      curLongestPali = evenLengthPali;
    }
  }

  return curLongestPali;
}

let str = 'aabaaabbbbaaa';

longestPalindrome(str);
