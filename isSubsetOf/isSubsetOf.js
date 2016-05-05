/*
 * Make an array method that can return whether or not a context array is a
 * subset of an input array.  To simplify the problem, you can assume that both
 * arrays will contain only strings.
 *
 * 
 * var a = ['commit','push']
 * a.isSubsetOf(['commit','rebase','push','blame']) // true
 *
 * NOTE: You should disregard duplicates in the set.
 *
 * var b = ['merge','reset','reset']
 *
 * b.isSubsetOf(['reset','merge','add','commit']) // true 
 *
 * See http://en.wikipedia.org/wiki/Subset for more on the definition of a
 * subset.
*/

/*
 * Extra credit: Make the method work for arrays that contain any value,
 * including non-strings.
*/


//test cases:
// var a = ['a', 'b', 'c'];
// var b = ['a', 'b', 'c', 'd'];
// var c = ['a', 'b', 'd'];

// var d = [1,2,3];
// var e = [1,2,3,4];
// var f = [1,2,4,5];

// var g = [{name : "god"}, {age : 10}];
// var h = [{name : "god"}, {age : 10}, {height : 100}];
// var i = [{name : "god"}, {cat : true},  {height : 100}];

 


Array.prototype.isSubsetOf = function(array){

  var targetFreqObj = array.reduce(function  (obj, item) {
      obj[JSON.stringify(item)] = true;
      return obj;
     }, {});
  return this.every(function (item) {
  	return targetFreqObj[JSON.stringify(item)];
  });
};


