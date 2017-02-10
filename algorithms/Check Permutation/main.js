/* check multiple strings and see if they are permutations of each

   permutations: same characters different positions
   so just need to check and see if all string share same characters set
   and each character share the same amount

   if strings are off different length
   then no due to differnt character set and/or amount

   loop through to check each string with the next one?
   set global hastTable for character set for the first string
   set global string length for the first string
   then compare the second and on:
     compare length, if differnt, return false;
     loop through second string to build another hashTable
     compare global hashTable to second stirng table
       if value not found or different then return false

   default return true;

   time: makeStringRecord, the loop is n
   adding char to hash is O(1) and there will be n rounds of that
   so it is n
   space:
   creating a hashTable of all uniq characters: n
   and the uniq key another n
   so 2n or n

   checkPermutation:
   time: n for amount of input strs, k for the longest str
   so: n * k for loop through the strs list and each str
   makeRecord will be k
   so: n * (2k) or n * k

   space: the longest str will have a record that is k size
   there are n amount of them, so:
   n * k
 */

let makeStringRecord = (str) => {
  let record = { uniq: []};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    record[char] = (record[char] || 0) + 1;
    if (record[char] === 1) {
      record.uniq.push(char);
    }
  }
  return record;
}

let checkPermutationOriginal = (...strs) => {
  let globalLength = strs[0].length;
  let strRecord = makeStringRecord(strs[0]);
  let uniqChars = strRecord.uniq;

  for (let i = 1; i < strs.length; i++) {
    if (globalLength !== strs[i].length) {
      return false;
    }
    let secondStrRecord = makeStringRecord(strs[i]);
    let isPermute = uniqChars.every((char) => {
      return strRecord[char] === secondStrRecord[char];
    })
    if (!isPermute) {
      return false;
    }
  }
  return true;
}


/* check as you go
  make one record, then when looping through the second string
  find char key in record and decrement it by 1
   then check if value is less than 0, if yes return false;

  but how do you do that for multiple strings?
   use Object.create to make a copy of the global record
   and decrement that copy
 */

let checkPermutation = (...strs) => {
  let globalRecord = makeStringRecord(strs[0]);
  let globalLength = strs[0].length;
  for (let i = 1; i < strs.length; i++) {
    let secondStr = strs[i];
    if (globalLength !== secondStr.length) {
      return false;
    }
    let recordCopy = Object.create(globalRecord);
    for (let j = 0; j < secondStr.length; j++) {
      let char = secondStr[j];
      if (recordCopy[char] === undefined || (--recordCopy[char]) < 0) {
        return false;
      }
    }
    return true;
  }
}

/* time: k is the length of the first str
 * w is the length of the longest string;
   copying the globalRecord would be k
   need to copy n times
   n * k
   comparing subsequence strings would be w for each loop
   n * w + n * k
   so n ( w + k) for time complexity

   space:
   k for the globalRecord
   recordCopy would be k
   for records, it's 2k or k
 */
