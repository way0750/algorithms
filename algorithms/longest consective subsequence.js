/*
   Longest Consecutive Subsequence
   Given an array of integers, find the length of the longest sub-sequence such
   that elements in the subsequence are consecutive integers, the consecutive
   numbers can be in any order.

   Examples

   Input: arr[] = {1, 9, 3, 10, 4, 20, 2};
   Output: 4
   The subsequence 1, 3, 4, 2 is the longest subsequence
   of consecutive elements

   Input: arr[] = {36, 41, 56, 35, 44, 33, 34, 92, 43, 32, 42}
   Output: 5
   The subsequence 36, 35, 33, 34, 32 is the longest subsequence
   of consecutive elements. 
*/

/*
  solution 1 add each number to a hashTable with each key assigned to [num]
  then loop through the array
    for each number, arr[i], increment by 1 and check agains the hash
      continuesly
      if found, add one to arr[i+1] to arr[i]
      but if found and it is larget than 1, add the value and stop
       delete arr[i] or arr[i + k]
      if not found, stop

   when done return the largest number found in the hash

   time: n for making the seqRecord, n for looping through the array
   each looping, there is a nested loop but worst is only one while loop for
   each array element, or for one of the nested loop, it loops through n amount
   and subsequence nested loops loops through nothing, so that is another n
   then at the end loop through remaing keys in seqRecord, worst case is another
   n
   so that is 4n or n

   space is the same

*/



let findLongestNumSeq = (nums) => {
  let seqRecord = nums.reduce((record, num) => {
    record[num] = (record[num] || []).concat(num);
    return record;
  }, {});

  nums.forEach((num, index) => {
    if (seqRecord[num]) {
      let nextNum = num + 1;
      while(seqRecord[nextNum]) {
        seqRecord[num] = seqRecord[num].concat(seqRecord[nextNum]);
        delete seqRecord[nextNum];
        nextNum++;
      }
    }
  });

  return Object.keys(seqRecord)
    .reduce((longArray, key) => {
      return seqRecord[key].length > longArray.length ? seqRecord[key] : longArray;
    }, [])
    .length;
}

/* let arr = [1, 9, 3, 10, 4, 20, 2];
 * let result = findLongestNumSeq(arr);
 * console.log(result)
 * */

/*
  make record of each number
   then loop through the array
   see if there is a number that is smaller by 1 in the record
    if yes, then don't do anything becaue we will count by increment later
    and the counting will cover the number we didn't do anything about
   if no, then that number has to be the beginning of a sequence
     so start counting until finding a number that is not found in the record
     when done compare that amount to a global max
   
   set globalMax to 0
   set record to hash and add each number in the array to it by
     using the number as key, and 1 as default value, if already found
     then increment
   loop through the number array, for each number, see if number - 1 exist in
   the record
     if yes, then do nothing
     if no, then set localMax to record value of number
       set nextNumber to number + 1;
       then while loop if nextNumber is found in record
         if yes increment the localMax by the value of nextNumber in record
     when done while looping, set globalMax to the max of globalMax and localMax
   return globalMax
*/

let findLongestNumSeqImproved = (nums) => {
  let numRecord = nums.reduce((record, num) => {
    record[num] = record[num] ? ++record[num] : 1;
    return record;
  }, {});

  return nums.reduce((globalMax, num) => {
    if (!numRecord[num - 1]) {
      let localMax = numRecord[num];
      let nextNum = ++num;
      while (numRecord[nextNum]) {
        localMax += numRecord[nextNum];
        nextNum++;
      }
      globalMax = Math.max(globalMax, localMax);
    }
    return globalMax;
  }, 0);
}

let arr = [12, 1, 11, 9, 3, 15, 10, 16, 4, 20, 2, 13, 14];
let result = findLongestNumSeqImproved(arr);
console.log(result)

