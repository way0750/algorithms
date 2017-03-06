/*
   In England the currency is made up of pound, £, and pence, p, and there
   are eight coins in general circulation:

   1p piece
   2p piece
   5p piece
   10p piece
   20p piece
   50p piece
   £1 (100p)
   £2 (200p)

   It is possible to make £2 in the following way:

   1 * £1 + 1 * 50p + 2 * 20p + 1 * 5p + 1 * 2p + 3 * 1p
   How many different ways can £2 be made using any number of coins?

   example usage of `makeChange`:

   // aka, there's only one way to make 1p. that's with a single 1p piece
   makeChange(1) === 1
   // aka, there's only two ways to make 2p. that's with two, 1p pieces or with a single 2p piece
   makeChange(2) === 2

   given a array of coins in their respective values
   given a value
   return the amount in which you can sum some of the values in the array

   somthing about reusing results
   something about recursion, getting same input, then getting same result
   from cache and just return it

   input one value, then value * 1 coin, * 2, * 3, etc... you can't give coins
   to that value anymore

   try * 1, then pass remining value to next recursive call?

   if input is 0 return what? 1? for finding one path/way?

   hmmmmm.........
   go through the coin array
     for each coin try to go from 1 to x amount (exceeding the input value) and
   pass remaing value to next call and then see how many way/path you can find
   use cache too: input + array? current coin?

   will use a wrapper function due to usage of cache
     and use it to check if input is < 1, if so return 0;

   for the closure:
   base case: if input is 0 return 1, if < 0 return 0;
   how to make problem smaller: each call pass index num which is the coin index
   and the array, and pass in $value
   what to return: always return a number for the amount of legit ways found
   what to do with return: keep on returning it.
 */

let coinSums = function(array, target) {
  let cache = {};
  let search = (array, target, index) => {
    if (target === 0) {
      return 1;
    } else if (index === array.length - 1) {
      return target % array[index] === 0 ? 1 : 0;
    } else if (target < 0 || index >= array.length) {
      return 0;
    }

    let mutiplier = 0;
    let curNum = array[index];
    let product = curNum * mutiplier;
    let foundPaths = 0;

    while (product <= target) {
      let subPath = search(array, target - product, index + 1);
      foundPaths += subPath;
      mutiplier++;
      product = curNum * mutiplier;
    }
    return foundPaths;
  }

  return search(array, target, 0);
};
