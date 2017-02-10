
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

