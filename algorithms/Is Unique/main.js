
/* Is Unique: Implement an algorithm to determine if a string has all unique
 * characters. What if you cannot use additional data structures?*/




/* solution one:
 * use a hashTable to keep track of characters as a for loop goes through the
 * input string. for each character, add it to the hashTable if not found
 * if found return false
 * default return true;

   time complextity: n for adding to hashTable, a for looping
   so 2n which is n
   space: n for hashTable
*/


let isUniqueUsingHashTabel = (str) => {
  let record = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    record[char] = (record[char] || 0) + 1;
    if (record[char] > 1) {
      return false;
    }
  }
  return true;
};


/* without using additional data structure:
   so reuse the input string as data tracking?
   if javascript, then string are immutable

   loop through the input string
   append 1 for each character's numeric value + input string length
   to the instring
   reasign this new string as the string
   check and see if 1 already there when inserting
     if yes, return false
   default return true;

   time: n for looping through the string
   for language that recreate the entire string when there is modification:
     n * letter that has the largeset numberic value
     n * k
   for space:
     n + k (letter with largest numeric value)
 */


let isUnique = (str) => {
  let strLength = str.length;
  for (let i = 0; i < strLength; i++) {
    let recordIndex = str[i].charCodeAt() + strLength;
    if (+str[recordIndex] === 1) {
      return false;
    } else {
      if (str.length - 1 < recordIndex) {
        str += '0'.repeat(recordIndex - str.length);
      }
      str = str.slice(0, recordIndex) + '1' + str.slice(recordIndex+1);
    }
  }
  return true;
}
