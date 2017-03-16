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

   time and space:
   looping through the string: n
   then each time you found a repeated char, you need to clear and recreate the
     record: at worst, you will need to recreate k times for k repeatd chars,
     and loop l iterations to recreate the record
     so total n + k * l

   for space:
     record would take the length of the longest sub string if we only use 255 chars
       then it would be at worst 255 chars big
     curStart and max are constant
*/

let longestUniqSubstring = function(string) {
  let record = {};
  let curStart = 0;
  let curMax = 0;

  for (let i = 0; i <= string.length; i++) {
    let char = string[i];
    if (record.hasOwnProperty(char) || i === string.length) {
      curMax = Math.max(curMax, i - curStart);
      curStart = record[char] + 1;
      record = {};
      if (i < string.length) {
        for(let j = curStart; j <= i; j++) {
          char = string[j];
          record[char] = j;
        }
      }
    } else {
      record[char] = i;
    }
  }

  return curMax;
};

/*
   what if I have to use recursion?
   when found repeativie chars calculate length and recursively call?
   just pass start and end index
   when repeat found or at end, calculat length, clear record, recursively call

   base case: at the end of string, curIndex is same as string length
     calculat substring length
   how to make problem smaller: pass repeat char first occurency + 1 as start
     pass cur index as curIndex;
     recreate record form curStart to curIndex;
   what to return: a number
   what to with returns: return the max;
*/

//working but don't use it with long string due the limites on recursion amount
let longestUniqSubstringRecursion = function(string, curStart = 0, curIndex = 0) {
  if (curStart >= string.length) return 0;

  let record = {};
  for(let i = curStart; i < curIndex; i++) {
    let char = string[i];
    record[char] = i;
  }

  let char = string[curIndex];
  while (!record.hasOwnProperty(char) && curIndex < string.length) {
    record[char] = curIndex;
    curIndex++;
    char = string[curIndex];
  }
  let curMax = curIndex - curStart;
  // get the next start index, but if at the end of stirng already
  // then char would be undefined and + 1 would yeild NaN, then assgin
  // curIndex instead
  curStart = record[char] + 1 || curIndex;
  return Math.max(curMax, longestUniqSubstring(string, curStart, curIndex));
};
