/*jshint expr:true*/

/**
 * Insertion sort is a basic sorting algorithm.
 *
 * Insertion sort iterates over an array, growing a sorted array behind the current location.
 * It takes each element from the input and finds the spot, up to the current point,
 * where that element belongs. It does this until it gets to the end of the array.
 *
 * Insertion sort should be implemented as a stable sort. This means that equal elements
 * should retain their relative order. Numbers, as primitives, give us no way to check this,
 * so we'll be sorting objects with a value field, on which they will be sorted, like so:
 *
 * `[{value: 10}, {value: 5, order: 1}, {value: 5, order: 2}]`
 *
 * A stable sort must return `{value: 5, order: 1}, {value:5, order: 2}` in that order.
 *
 * ---
 *
 * EXTRA CREDIT:
 *
 * Refactor your sort to (optionally) take an explicit comparator function
 * as its second argument, so that callers can define arbitrary ways to sort elements.
 * See [Array.prototype.sort](http://devdocs.io/javascript/global_objects/array/sort)
 * for an example of how this works (excerpt below):
 *
 * > If `comparator(a, b)` is less than `0`, sort `a` to a lower index than `b`, i.e. `a` comes first.
 * > If `comparator(a, b)` returns `0`, leave `a` and `b` unchanged with respect to each other, but sorted with respect to all different elements.
 * > If `comparator(a, b)` is greater than `0`, sort `b` to a lower index than `a`.
 *
 * If no comparator is given, just sort the elements using `<` or `>`.
 **/

// Example usage:
// insertionSort([{value: 2}, {value: 1}, {value: 3}]);
// yields [{value: 1}, {value: 2}, {value: 3}]

// This function is to help you test, and should not be incorporated in your solution.
// It will transform an array of numbers into an array of valid objects.
var testingTransform = function(array) {
  var transform = [];
  
  for (var i = 0; i < array.length; i++)
    transform.push({value: array[i], i: i});

  return transform;
};

var swapEle = function(arr, index, callBack){
  if (index === 0){return arr;}
  // callBack = callBack ? callBack : function(obj1, obj2){return obj1 < obj2 ? -1 : +(obj1 > obj2);};
  var compResult;
  for(var round = index; round>0; round--){
    compResult = callBack(arr[round-1], arr[round]);
    if (compResult === 1){
      var tempHolder = arr[round-1];
      arr[round-1] = arr[round];
      arr[round] = tempHolder;
    }
  }
  return arr;
};

var insertionSort = function(array, callBack) {
  callBack = callBack ? callBack : function(obj1, obj2){return obj1 < obj2 ? -1 : +(obj1 > obj2);};
  // Your code goes here. Feel free to add helper functions if needed.
  var copiedArr = array.slice();
  for (var i = 0; i < array.length-2; i++){
    swapEle(copiedArr, i, callBack);
  }
  return array;
};




function insertionSort(array, callback) {
  array = array.slice();
  callback = callback || function (obj1, obj2){
    return obj1.value > obj2.value; // true for need to switch
  };
  for (var i = 0; i < array.length-1; i++){
      var backIndex = i;
      while (backIndex > -1 && callback(array[backIndex], array[backIndex + 1])) {
        var tempElem = array[backIndex];
        array[backIndex] = array[backIndex+1];
        array[backIndex+1] = tempElem;
        backIndex--;
      }
  }
  return array;
}


//second version, refactor to use typeof cb === 'function' which is safer


function insertionSort(arr, cb) {
  cb = typeof cb === 'function' ? cb : function (a, b) {return a > b;};
  arr = arr.slice();
  for (var i = 0; i < arr.length; i++){
    var compIndex = i;
    while ( compIndex > -1 && cb(arr[compIndex], arr[compIndex - 1])){
      let temp = arr[compIndex];
      arr[compIndex] = arr[compIndex - 1];
      arr[compIndex - 1] = temp;
      compIndex--;
    }
  }
  return arr;
}

let arr = [3,245,24,62,45,23,42,46,345,63];
insertionSort(arr, function(a, b){
  return b > a;
});



insertionSort([{value: 1}, {value: 3}, {value: 90}, {value: 1}], function(obj1, obj2){
  return obj1.value < obj2.value;
});
