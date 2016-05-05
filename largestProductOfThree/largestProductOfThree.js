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


