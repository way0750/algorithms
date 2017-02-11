/* Given a string, write a function to check if it is a permutation of a
   palindrome. A palindrome is a word or phrase that is the same forwards and
   backwards. A permutation is a rearrangement of letters. The palindrome
   does not need to be limited to just dictionary words.

   for a string to have the potential to be an palindrome
   we need each uniq character to have even amount of repetitions
     if there are odd repetitions, there can only be one such case
   if there is one or none character with odd amount of repetitions
   then the string can be rearrangemeed into palindrome


   keep a record of character with odd repetitions
   loop through the string
     check each character to see if it is found in the record
       if yes, that mean with the current repetition, it currently has
       even amount, so delete it form the record, if later on it is found again
       we can add it back into it
   then at the end check the amount of keys in the record
     return true is the amount if 1 or 0

   or no need to delete keys off the record
   after incrementing the value of each key
   check the new value, if it is even decrement the global amount of odd
   character, it it is odd, the increment the same global amount
 */

let isPalidromable = (str) => {
  let charWithOddRepeat = 0;
  let repeatitionRecord = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    repeatitionRecord[char] = (repeatitionRecord[char] || 0) + 1;
    if (repeatitionRecord[char] % 2 === 0 ) {
      charWithOddRepeat--;
    } else {
      charWithOddRepeat++;
    }
  }
  return charWithOddRepeat < 2;
}

/* time and space:
   time:
   looping through the input string: n

   space:
   repeatitionRecord takes n at worst case
   so n again
 */
