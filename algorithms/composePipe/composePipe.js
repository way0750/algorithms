/*
 * Write Compose and Pipe functions.
 *
 * Step 1: Implement the function Compose: 
 *
 * Compose should return a function that is the composition of a list of
 * functions of arbitrary length.
 *
 * Each function is called on the return value of the function that follows.
 *
 * You can view compose as moving right to left through its arguments.
 *
 * Compose Example:
 *   var greet = function(name){ return 'hi: ' + name;}
 *   var exclaim = function(statement) { return statement.toUpperCase() + '!';}
 *   var welcome = compose(greet, exclaim);
 *   welcome('phillip');
 *    // 'hi: PHILLIP!'
 *
 * Step 2: Implement the function Pipe:
 *
 * Pipe composes a series of functions and returns the resulting function.
 *
 * Each function is called on the return value of the preceding function.
 *
 * You can view pipe as moving left to right through its arguments.
 *
 * Pipe Example:
 *  var add2 = function(number){ return number + 2; }
 *  var multiplyBy3 = function(number){ return number * 3; }
 *  pipe(add2, multiplyBy3)(5) // 21
 *  pipe(add2, multiplyBy3, multiplyBy3)(5) // 63
 */

'use strict';

var compose = function(){
  var functs = Array.apply(null, arguments);
  return function () {
    var args = Array.apply(null, arguments);
    for (var i = functs.length-1; i > -1; i--){
      var curFunct = functs[i];
      args = curFunct.apply(null, args);
      args = [args];
    }
    return args[0];
  };
};

var pipe = function(){
  var functs = Array.prototype.slice.apply(arguments, [0]);
  return function () {
    var args = Array.prototype.slice.apply(arguments, [0]);
    for (var i = 0; i < functs.length; i++){
      var curFunct = functs[i];
      args = curFunct.apply(null, args);
      args = [args];
    }
    return args[0];
  };
};



//second version

function makeComposeFunct (shouldGoFromLeftToRight) {
  var travelFunction = shouldGoFromLeftToRight ? "reduce" : "reduceRight";
  return function () {
    var functList = Array.apply(null, arguments);
    return function (arg) {
      return functList[travelFunction](function (returnVal, funct) {
         return funct(returnVal);
      }, arg);
    };
  };
}

var compose = makeComposeFunct(false);
var pipe = makeComposeFunct(true);

var greet = function(name){ return 'hi: ' + name;};
var exclaim = function(statement) { return statement.toUpperCase() + '!';};
var welcome = compose(greet, exclaim);
welcome('phillip');


var add2 = function(number){ return number + 2; };
var multiplyBy3 = function(number){ return number * 3; };
pipe(add2, multiplyBy3)(5); // 21
pipe(add2, multiplyBy3, multiplyBy3)(5); // 63
