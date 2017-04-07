/*
Follow up for "Remove Duplicates":
What if duplicates are allowed at most twice?

For example,
Given sorted array nums = [1,1,1,2,2,3],

Your function should return length = 5, with the first five elements of nums
   being 1, 1, 2, 2 and 3. It doesn't matter what you leave beyond the
   new length.

   solution:
   set foundDupForCurNum to false;
   set length to 0;
   loop thorugh the array and compare current number to last number
   if the same and foundDupForCurNum is false then length++;
   if not the same then length++ and set foundDupForCurNum to false;

   return length;
*/

let removeDupplicates = function(arr) {
  let record = arr.reduce((record, curNum, index) => {
    let preNum = arr.hasOwnProperty(index - 1) ? arr[index-1] : -Infinity;
    if (curNum === preNum && record.firstDup) {
      record.length++;
      record.firstDup = false;
    } else if (curNum !== preNum) {
      record.length++;
      record.firstDup = true;
    }

    return record;
  }, { length: 0, firstDup: true });

  return record.length;
};
