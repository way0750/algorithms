/*jshint expr:true*/

/*
 * Bubble sort is the most basic sorting algorithm in all of Computer
 * Sciencedom. It works by starting at the first element of an array and
 * comparing it to the second element; if the first element is greater than the
 * second element, it swaps the two. It then compares the second to the third,
 * and the third to the fourth, and so on; in this way, the largest values
 * "bubble" to the end of the array. Once it gets to the end of the array, it
 * starts over and repeats the process until the array is sorted numerically.
 *
 * Implement a function that takes an array and sorts it using this technique.
 * Don't use JavaScript's built-in sorting function (Array.prototype.sort).
 *
 * QUERY: What's the time complexity of your algorithm? If you don't already
 * know, try to intuit this without consulting the Googles.
 *
 * Extra credit: Optimization time! During any given pass, if no elements are
 * swapped we can assume the list is sorted and can exit the function early.
 * After this optimization, what is the time complexity of your algorithm?
 *
 * Moar credits: Do you need to consider every element every time you iterate
 * through the array? Make it happen, boss. Again: Has the time complexity of
 * your algorithm changed?
*/

/*
 * Example usage:
 * bubbleSort([2, 1, 3]); // yields [1, 2, 3]
 *
*/

// Introduce i into the global scope so we can test function efficiency
var i;

// Feel free to add helper functions if needed.

// implement a while loop wit a needToSort variable that sets to true, but set to false in while, but then switch back to true whenever a swap happens
// inside of the while loop, have a for loop that loops through
// each element, swap if first is bigger than second
// 
var count = 0;
var bubbleSort = function(array) {
	var copyArr = array.slice();
  var alreadySorted = [], sortTilIndex=0, shouldUpdateSortedIndex=false;
  while(copyArr.length){

  	for (var i = 0; i < copyArr.length-1; i++){
  		count++;
  		if (!shouldUpdateSortedIndex){sortTilIndex++;}

  		if (copyArr[i] > copyArr[i+1]){
  			var tempValue = copyArr[i];
  			copyArr[i] = copyArr[i+1];
  			copyArr[i+1] = tempValue;
  			if (!shouldUpdateSortedIndex){
  				sortTilIndex = i-1;
  				shouldUpdateSortedIndex = true;
  			}

  		}
  	}
  	shouldUpdateSortedIndex = false;
  	alreadySorted = alreadySorted.concat(copyArr.splice(0, sortTilIndex));
  }

  return alreadySorted;
};





//using iterative mean:
function bubbleSortNotWroking(array) {
  array = array.slice();
  var endIndex = array.length - 1;
  while (endIndex > 0) {
    console.log(endIndex);
    for (var i = 0; i < endIndex; i++) {
      if (array[i] > array[i + 1]) {
        var temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
      }
    }
    endIndex--;
  }
  return array;
}


//using recursion:
function bubbleSortNotworking(array) {
  array = array.slice();
  if (array.length < 2) {
    return array;
  }
  
  var max = array.reduce(function (curMax, ele) {
    return ele > curMax ? ele : curMax;
  }, -Infinity);

  return bubbleSort(array.slice(0, array.length - 1)).concat(max);
}



var arr = [32,41,35,23,41,234,1234,123,4,134,134,51,34,56234,513,4,1324,123,1234,2,3,3,3,4,15,];

