/*
   Given a sorted integer array where the range of elements are [0, 99]
   inclusive, return its missing ranges.
   For example, given [0, 1, 3, 50, 75],
   return [“2”, “4->49”, “51->74”, “76->99”]
*/


let findMissingRanges = function(nums) {
  if (!nums.length) return ['0->99'];

  return nums.reduce((arr, curNum, index) => {
    let nextNum = nums.hasOwnProperty(index + 1) ? nums[index+1] : 100;
    if (nextNum - curNum === 2) {
      arr.push(`${curNum+1}`);
    } else if (nextNum - curNum > 1) {
      arr.push(`${curNum + 1}->${nextNum-1}`);
    }
    return arr;
  }, []);
}
