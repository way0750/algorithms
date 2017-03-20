/*
Given a string containing just the characters '(' and ')', find the length of
   the longest valid (well-formed) parentheses substring.

For "(()", the longest valid parentheses substring is "()",
   which has length = 2.

Another example is ")()())", where the longest valid parentheses substring
   is "()()", which has length = 4.

   use a stack and push parentheses into a stack like this { index: 5, left: true }
   whenever there is a patch parent, then pop and calculate the distance from
   current index to the closest not closed parent (which is the last item in stack)

   what if there are many fragmented valid strings of different length?
   we are looking for the longest one, and we will calculate the length of current
   valid substring whenever there is matching and popping.

   we will always get the current valid sub string, when you pop, you get one
   and you have the current index and closest parent that isn't closed, so you
   will get the length current valid length

   so just keep on updating the current max and you are done
   also don't forget to loop one index further as a way to close things up

   pseudocode:
   set stack to an array
   set curMax to 0
   loop through string one char per loop
     if current char is closing char, check the lastest char in stack
       if matches, update the curMax:
           curMax vs current index - lastest item's index in the stack
                     it will give you the length of current valid sub string
     if current char isn't closing char, add it with left or right to true
       and its index
   return curMax;
*/


let longestValidParent = function(str) {
  let stack = [];
  let curMax = 0;

  for(let i = 0; i <= str.length; i++) {
    let char = str[i];
    let lastChar = stack[stack.length - 1] || { isLeft: false, isRight: false };
    if (char === ')' && lastChar.isLeft ) {
      stack.pop();
      lastChar = stack[stack.length - 1] || { index: -1 };
      curMax = Math.max(curMax, i - lastChar.index);
    } else {
      stack.push({
        index: i,
        isLeft: char === '(',
        isRight: char === ')',
      });
    }
  }

  return curMax;
}
