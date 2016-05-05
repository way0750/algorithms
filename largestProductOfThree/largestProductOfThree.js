/* Write a function that finds the largest possible product of any three numbers
 * from an array.
 * 
 * Example:
 * largestProductOfThree([2, 1, 3, 7]) === 42
 *
 * Extra credit: Make your function handle negative numbers.
 */



// var largestProductOfThree = function(array) {
	// array = array.sort(function(n1, n2){
	// 	return n1 > n2;
	// });
// 	array = array.splice(-3);
//   return array.reduce(function(product, num){
//   	return product * num;
//   });
// };

//just in case the input array is huge, then sorting through them 
//would take too long, this would be an optimized version of above
//function.

var sortArr = function(arr){
	return arr.sort(function(n1, n2){
		return n1 > n2;
	});	
};

var largestProductOfThree = function(array){
	var arr = array.slice();
	var bigNums = arr.splice(0, 3);
	bigNums = sortArr(bigNums);
	arr.forEach(function(num){
		if (num > bigNums[0]){
			bigNums.push(num);
			bigNums = sortArr(bigNums);
			bigNums = bigNums.slice(1);
		}
	});
	return bigNums.reduce(function(product, num){
		return product * num;
	});
};




// second version:

function largestProductOfThree(arr) {
  arr = arr.sort(function (n1, n2) {
    return n1 > n2;    
  });
  var product = function (arr) {
    return arr.reduce(function (product, num ) {
      return product * num;
    });
  };
  var leftArr = [arr[0], arr[1], arr[arr.length - 1]];
  var rightArr = arr.slice( Math.max(arr.length - 3, 0) );
  return Math.max(product(leftArr), product(rightArr));
};


largestProductOfThree([5,4,3,-6,-7,3]);
