/*
   maybe should make a function to take an input that string then format it
   and make things easier to paste into a file like this;
     should add indentation if certain line is too long

   Given a string, find the length of the longest substring without repeating
    characters.

   Examples:

   Given "abcabcbb", the answer is "abc", which the length is 3.

   Given "bbbbb", the answer is "b", with the length of 1.

   Given "pwwkew", the answer is "wke", with the length of 3. Note that the
     answer must be a substring, "pwke" is a subsequence and not a substring.

   abcdacdceaec
   set record to {}
   set curStart to 0
   set curMax to 0
   loop from 1 to <= string length
     set curChar to current character
     if curChar is not found in record
       add curChar as key, current index as value
     if curChar is found in record or current index is string length
       time to calculate the length of substring by current index - curStart
       assign the result to curMax if larger
       assign the found repeat char's first occurent index from record
       to curStart
       assign {} to record
       loop from curStart to current index and ass each char and their index;
         unless current index is same as length

   return curMax;
*/

let longestUniqSubstring = function(string) {
  
}
