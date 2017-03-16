let crazy_sum = function(numbers) {
  return numbers.map((number, index) => number * index);
};

/*
   the square root of input num, but less than input number
   go from 1..toinput number?
   how about going from i to input/2 or sqrt(input);

   get half of input number, floor it
   then go from that lower and lower by 1 until finding one that is smaller
   than input

   base case: test number * test number is less than num
     return it
   how to make it smaller: test - 1;
   what to return: number
   what to do: return it
*/

let square_nums = function(num, testNum = Math.floor(num/2)) {
  return testNum * testNum < num ? testNum : square_nums(num, testNum - 1);
}

/*
   given a number
   go from 1 to it exlusive
   and generate an array with number, in acending order, only divisible by 3 or 5

   base case: number is same as input number
     return an empty array even if number is divisible by 3 or 5
   make problem smaller: going from 3 and add 1
   what to return: an array
   what to do with return: if current number is only divisible by 3 or 5
   unshift it into array and return it
*/

let crazy_nums = function (target, curNum = 3) {
  if (curNum >= target) return [];

  let validNums = crazy_nums(target, curNum + 1);

  let by3 = curNum % 3 === 0;
  let by5 = curNum % 5 === 0;
  if((by3 || by5) && !(by3 && by5)) validNums.unshift(curNum);

  return validNums;
}

console.log(crazy_nums(20));
