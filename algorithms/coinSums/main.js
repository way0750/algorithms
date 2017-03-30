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

   time and space complexity:
     time go through each coin in the array
     for each coin there could be target / last coin amount of iterations
     so total of coin * target * 1/ last coin amount of iterations?
   space:
     there will be coin array size amount of stack of search
     and for each search, there will be at most target / last coin amount of recursion
     so soin array size * (target / last coin);
 */

let coinSums = function(array, target) {
  let cache = {};

  let testDiffCoinAmount = (target, coin, callBack, multiplier = 0) => {
    let product = coin * multiplier;
    if (product > target) return 0;
    callBack(target - product);
    testDiffCoinAmount(target, coin, callBack, multiplier + 1);
  };

  let search = (array, target, index) => {
    if (target === 0) {
      return 1;
    } else if (index === array.length - 1) {
      return target % array[index] === 0 ? 1 : 0;
    } else if (target < 0 || index >= array.length) {
      return 0;
    }

    let foundPaths = 0;
    testDiffCoinAmount(target, array[index], (deductedAmount) => {
      let cacheKey = `${deductedAmount}: ${index + 1}`;
      cache[cacheKey] = cache.hasOwnProperty(cacheKey)
                      ? cache[cacheKey]
                      : search(array, deductedAmount, index + 1);
      foundPaths += cache[cacheKey];
    });
    return foundPaths;
  }

  return search(array, target, 0);
};





// let's do it with dynamic programming:
/*
   so you will biuld re-usable solutions from 0 to target
   re-user sum if found
   else find how many ways to make changes
   ex: 3: try 0:3, 1:3, 2:3, until amount * coin > target
   so start from left to right? large demo to smallest one?
   and when gets to the last one just do the value % coin thing?
*/

let coinSumDP = function(coins, target) {
  coins.sort((n1, n2) => n1 <= n2);

  let search = function(coins, coinIndex, target, table) {
    let coin = coins[coinIndex];
    if (coinIndex === coins.length - 1) {
      return target % coin === 0 ? 1 : 0;
    } else if (table.hasOwnProperty(target)) {
      return table[target];
    }

    let coinAmount = 0;
    let possibilities = 0;
    let amount = 0;
    while(coin * coinAmount <= target) {
      let subAmount = target - coin * coinAmount;
      let newAmount = search(coins, coinIndex + 1, subAmount, table);
      amount += newAmount;
      coinAmount++;
    }

    table[target] = amount;
    return amount;
  }

  let table = {};
  for (let DPCase = 0; DPCase <= target; DPCase++) {
    search(coins, 0, DPCase, table);
  }

  return table[target];
}

qt(function() {
  let arr = [7,5,4,3,2];

  /*
     8
     6 2
     5 3
     4 4
     3 3 2
     2 2 2 2
  */

  let target = 7;
  let result = coinSumDP(arr, target);

  let result002 = coinSums(arr, target)
  console.log(result)
  result.should.equal(result002);
});