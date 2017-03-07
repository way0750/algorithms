/*
   I am using my own editor!!!!!!
   get grand total
   and make cumulative sum array for sub sum at certain index
   then go through the cumulative sum array one by one, and compare 
   grant total - next sum === current sum
   if yes, then the index is a equalibriliam index

 */

function solution(array) {
  // get grand total:
  let cumulativeSums = array.reduce(function(arr, num){
    let lastSum = arr.length ? arr[arr.length - 1] : 0;
    arr.push(lastSum + num);
    return arr;
  }, [0]);
  let grandTotal = cumulativeSums[cumulativeSums.length - 1];
  let foundIndex = cumulativeSums.findIndex(function(curSum, index) {
    let previousSum = cumulativeSums.hasOwnProperty(index - 1)
                    ? cumulativeSums[index - 1]
                    : Infinity;
    return grandTotal - curSum === previousSum;
  });
  return foundIndex > -1 ? foundIndex - 1 : -1;
}

/* it('works?', function() {
 *   let arr = [-1, 3, -4, 5, 1, -6, 2, 1];
 *   solution(arr).should.equal(1);
 * });
 * it('what if it is empty?', function() {
 *   let arr = [];
 *   solution(arr).should.equal(-1);
 * });
 * it('what if it is an array of 1', function() {
 *   let arr = [1];
 *   solution(arr).should.equal(0);
 * });
 * it('2 elements', function() {
 *   let arr2 = [1, 0];
 *   solution(arr2).should.equal(0);
 * });*/
