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

  function findPaliAtIndex(pali, str, leftIndex, rightIndex) {
    let leftChar = str[leftIndex--];
    let rightChar = str[rightIndex++];
    while ((leftChar && rightChar) && (leftChar === rightChar)){
      pali = leftChar + pali + rightChar;
      leftChar = str[leftIndex--];
      rightChar = str[rightIndex++];
    }
    return pali;
  }

  let oddLengthPali, evenLengthPali;
  for (let i = 0; i < str.length; i++){
    oddLengthPali = findPaliAtIndex(str[i], str, i - 1, i + 1);
    evenLengthPali = findPaliAtIndex('', str, i, i + 1);
    
    curLongestPali = [curLongestPali, oddLengthPali, evenLengthPali].reduce( (curLongest, str) => {
     return str.length > curLongest.length ? str : curLongest;
    });
  }

  return curLongestPali;
}

let str = 'aabaaabbbbaaa';

longestPalindrome(str);
