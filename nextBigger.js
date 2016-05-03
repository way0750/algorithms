// next bigger number by permuting the digits in the input number
// or return -1 if no bigger number could be found
// 
// 
// 
// 
// go from right to left, push each number into sortedArray
// until running into a digit that is smaller than previous digit
//  once found, find the first digit in the sorted array that is larger than this number
//  swap
// concat all digits together, return





function nextBigger(num) {
  var numArr = num.toString(10).split('');
  var sortedArr = [];
  
  while (numArr[numArr.length - 1] >= (sortedArr[sortedArr.length - 1] || -Infinity)){
    sortedArr.push(numArr.pop());
    if (numArr.length === 0) {
      return -1;
    }
  }
  var swapNum = numArr.pop();
  var swapIndex = sortedArr.find(function(n, index) {
    return n > numArr[numArr.length - 1];
  });
  numArr.push(sortedArr[swapIndex]);
  sortedArr[swapIndex] = swapNum;

  return +(numArr.concat(sortedArr).join(''));
}
//8723965321
nextBigger(8723965321) === 8725123369;






function isPolydivisible(s, b){
  var round = s.length;
  var i = 2;
  var n = parseInt(s, b)+'';
  while (i < round){
    var result = n.slice(0, i)/i;
    if (result != Math.round(result)){return false;}
    i++;
  }

  return true;
}
