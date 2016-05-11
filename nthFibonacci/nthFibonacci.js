/**
 * A Fibonacci sequence is a list of numbers that begins with 0 and 1, and each
 * subsequent number is the sum of the previous two.
 *
 * For example, the first five Fibonacci numbers are:
 *
 *   0 1 1 2 3
 *
 * If n were 4, your function should return 3; for 5, it should return 5.
 *
 * Write a function that accepts a number, n, and returns the nth Fibonacci
 * number. Use a recursive solution to this problem; if you finish with time
 * left over, implement an iterative solution.
 *
 * example usage:
 * nthFibonacci(2); // => 1
 * nthFibonacci(3); // => 2
 * nthFibonacci(4); // => 3
 * etc...
 *
 */

//recursive solution
//base case when input is 0 return 0 when it is 1 return 1
//how to break smaller: if input 10 then f(9) + f(8)
//what to do with return see above

let nthFibonacci = (num) => {
	let memo = {};
	let calculFib = (num) => {
		if (num === 1 || num === 0) {
			return num;
		}
		let f1Num = num - 1, f2Num = num - 2;
		memo[f1Num] = memo[f1Num] === undefined ? calculFib(f1Num) : memo[f1Num];
		let f1 = memo[f1Num];
		memo[f2Num] = memo[f2Num] === undefined ? calculFib(f2Num) : memo[f2Num];
		let f2 = memo[f2Num];
		return f1 + f2;
	};
	return calculFib(num);
};

nthFibonacci(4); // => 3
