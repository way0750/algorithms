/*
e.g. (input: "1 + 10 * 5 + 4", output "55"). 
   something about matching (((())))
   something about using a stack
   so how about get all the numbers first, the push them into
   stack but then when ever running to a * sign, pop the last number
   mutiply and divide and push the result into stack?

   when done, then simply add all numbers up

   first, find all parts: operator and number
   then do the stack thing
   then sum the remaing stack
*/

let simpleStringCal = function(str) {
  str = str.replace(/ +/g, '');
  let numbers = str.match(/[\+\-\*\/]*\d+/g);
  let stack = numbers.reduce((stack, numStr) => {
    // check operator
    // get number
    // if * or / then pop from stack do * or / then push it back
    let higerPre = numStr[0].search(/[\*\/]/) > -1;
    let curNum = higerPre ? Number(numStr.slice(1)) : Number(numStr);
    if (numStr.search(/[\*\/]/) > -1) {
      let lastNum = stack.pop();
      let newNum = numStr[0] === '*' ? lastNum * curNum : lastNum / curNum;
      stack.push(newNum);
    } else {
      stack.push(curNum);
    }

    return stack;
  }, []);
  return stack.reduce((sum, num) => sum + num);
};

qt(function() {
  let expected = 1 + 10 * -5 * 10 + 4 - 9 / 9;
  let result = simpleStringCal('1 + 10 * -5 * 10 + 4 - 9 / 9');
  result.should.equal(expected)
});
