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

 */

let makeStringRecord = (str) => {
  let record = { uniq: []};
  for (let i = 0; i < str.length; i++) {
    console.log(i)
    let char = str[i];
    record[char] = (record[char] || 0) + 1;
    if (record[char] === 1) {
      record.uniq.push(char);
    }
  }
  return record;
}

let checkPermutation = (...strs) => {
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
