/*
   given an array of coins (in numbers) sorted in acending order
   given a number, value
   find a smallest amount of coins to make up to that value
     return a number basically
   ex: coins [20, 15, 10, 5, 4, 1]; value: 23
   return 3 because one way is: 15, 4, 4

   dynamic programming: build reusable smaller cases from the smallest num up
   to the last num

   in this num: go from 1 to 23 and build the smallest amount for each number
   1: smallest is 1
   2: smallest is 2 (2 of 1)
   3: ...
   4: smallest is 1 (1 of 4)
   8: smallest is 2 (2 of 4)

   the main focus is how to find the smallest for each number
   going from left to right on the coin array then make all combos
   input value, check and see if it can be found in the table, if yes then
   return it
   current coin * (amount) - input number === new value and recursively call
   20 15 10 5 4 1
    0  0  0 0 0 4
    0  0  0 0 1 0

   once done finding, enter the number and key to the table: value: smallest

   base num: input value if found in table, return it
     at the last coin, value % coin === 0 ? if yes return value / coin,
       else return Infinity

   how to make problem smaller: current coin * (0..until larger than value) - input
   what to return: a number, it means the amount of coins it needs for make curent
     value
   what to do with return:
     you will be going form 0..someNumber, get the smallest of 0..someNumber + return number
     and return it
*/

let smallestAmountOfChange = function(coins, target) {
  let table = {}
  let finalCoinIndex = coins.length - 1;
  let searchAmount = function(curCoinIndex, value) {
    if(table.hasOwnProperty(value)) return table[value];

    let coin = coins[curCoinIndex];

    if(curCoinIndex === finalCoinIndex) {
      return value % coin === 0 ? value/coin : Infinity;
    }

    let curSmallestAmount = Infinity;
    let curCoinAmount = 0;
    while (coin * curCoinAmount  <= value) {
      let newAmount = searchAmount(curCoinIndex + 1, value - coin * curCoinAmount);
      curSmallestAmount = Math.min(curSmallestAmount, newAmount + curCoinAmount);
      curCoinAmount++;
    }

    return curSmallestAmount;
  }

  for(let num = 1; num <= target; num++) {
    table[num] = searchAmount(0, num);
  }

  console.log(JSON.stringify(table))

  return table[target];
}
