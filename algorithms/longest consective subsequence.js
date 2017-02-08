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
*/

let findLongestNumSeq = (nums) => {
  let seqRecord = nums.reduce((record, num) => {
    record[num] = record[num]++ || 1;
    return record;
  }, {});

  nums.forEach((num) => {
    if (seqRecord[num]) {
      let nextNum = num++;
      while (seqRecord[nextNum]) {
        seqRecord[num] += seqRecord[nextNum];
        delete seqRecord[nextNum];
        nextNum = seqRecord[num];
      }
    }
  });

  return Object.keys(seqRecord).reduce((max, key) => {
    return seqRecord[key] > max ? seqRecord[key] : max;
  }, 0);
}

let arr = [1, 9, 3, 10, 4, 20, 2];
findLongestNumSeq(arr);
