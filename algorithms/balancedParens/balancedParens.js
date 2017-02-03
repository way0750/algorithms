/*
 * write a function that takes a string of text and returns true if
 * the parentheses are balanced and false otherwise.
 *
 * Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens('[(]{)}'); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' var wow  = { yo: thisIsAwesome() }'); // true
 * balancedParens(' var hubble = function() { telescopes.awesome();'); // false
 *
 *
 */


var balancedParens = function(input){
  var q = [];
  for (var i = 0 ; i < input.length ; i++){
    var lastSide = q[q.length-1];
    var curSide = input[i];
    var pair = lastSide + curSide;
    if (/\(\)|\[\]|\{\}/.test(pair)){
      q.pop();
    } else {
      q.push(curSide);
    } // close if
  }//close for loop
  return q.length === 0;
};

function balancedParens (str) {
  var brackets = {
    '}' : '{',
    ']' : '[',
    ')' : '(',
    '"' : '"'
  };

  var stack = [];

  var curChar;
  for (var i = 0; i < str.length; i++) {
    curChar = str[i];
    //check if current character is a side of bracket: [] {} () or ""
    if (/[\[\]\{\}\(\)\"]/.test(curChar)) {
      //if current character is a right side of a bracket and the most recent one in stack is the matching left
      //then pop the most recent one in stack. matching is found.
      if (brackets[curChar] && brackets[curChar] === stack[stack.length - 1]){
        stack.pop();
      } else {
        stack.push(curChar);
      }
    }
  }
  //check and see if there is any unmatched brackets in the array
  return stack.length === 0;
}


balancedParens(''); // true
balancedParens('[({})]');   // true
balancedParens('[(]{)}'); // false
