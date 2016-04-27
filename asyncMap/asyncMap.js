'use strict';

/* Implement the function asyncMap:
 *
 * asyncMap has two parameters, an array of asynchronous functions (tasks) and a callback.
 * Each of the tasks takes a separate callback and invokes that callback when complete.
 *
 * The callback passed to asyncMap is then performed on the results of the callbacks of the tasks.
 *
 * The order of these results should be the same as the order of the tasks.
 * It is important to note that this is not the order in which the tasks return,
 * but the order in which they are passed to asyncMap.
 *
 * Once all the callbacks of the tasks are returned, asyncMap should invoke the callback
 * on the results array.
 *
 *
 * Example:
 *
 * asyncMap([
 *  function(cb){
 *    setTimeout(function(){
 *      cb('one');
 *    }, 200);
 *  },
 *  function(cb){
 *    setTimeout(function(){
 *      cb('two');
 *    }, 100);
 *  }
 * ],
 *  function(results){
 *    // the results array will equal ['one','two'] even though
 *    // the second function had a shorter timeout.
 *    console.log(results); // ['one', 'two']
 * });
 *
 * takes two arguments: one array of functions, then a function as callBack to pass onto each function in array
 *
 * the order matters
 *
 * map the result to an array
 * but don't return it until all is done by checking with Object.keys(map).length == supposed length
 * keep looping until all is done
 *
 * 
 */


function asyncMap(arr, cb) {
  //wrap each asyn function in a promise
  //because each asyn function takes a callback, let the promise's resolve function be the callback
  //this way, when the resolve function in invoked, the promise is fulfilled
  var promiseList = arr.map(function (asynFunt) {
    return new Promise (function (resolve, reject) {
      asynFunt(resolve);
    });
  });

  //use Promise.all to keep track of all the promises' state, and set event handler to receive an array of
  //values, and invoke callback with that array.
  Promise.all(promiseList).then(function (value) {
    cb(value);
  });
}


asyncMap([
 function(cb){
   setTimeout(function(){
     cb('one');
   }, 2000);
 },
 function(cb){
   setTimeout(function(){
     cb('two');
   }, 0);
 },
 function(cb){
   setTimeout(function(){
     cb('three');
   }, 200);
 },
 function(cb){
   setTimeout(function(){
     cb('four');
   }, 0);
 },
],
 function(results){
   // the results array will equal ['one','two'] even though
   // the second function had a shorter timeout.
   console.log(results); // ['one', 'two']
});


