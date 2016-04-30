/*

In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:

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
*/


// 5:
// 
// start from 5 then lower to 1
// 
// 5:
//  5:
//  5 * 1, done don't go further!
//  
//  2:
//  2 * 1 + 1 * 1 = 3 and no more coin type left, so no go
//  2 * 1 + 1 * 2 = 4 and no more coin type left, so no go
//  2 * 1 + 1 * 3 = 5 done don't go further!
//  2 * 2 + 1 * 1 = 5 done don't go further!
//  2 * 3 already larger than 5 so no go
//  
//  1:
//  1 * 1 = 1
//  1 * 2 = 2
//  1 * 3 = 3
//  1 * 4 = 4
//  1 * 5 = 5 done don't go further!
//  
//  so all the possible combinations:
//  5 * 1
//  2 * 1 + 1 * 3
//  2 * 2 + 1 * 1
//  1 * 5
//  
//  
//  base case if coin array is empty return 0
//  how to break smaller: slice coin array at current location + 1
//  what to return: always number
//  what to do with return: add to totalCombo
//  
//  so loop from left to right big to small coin
//  find first coin that is =< than input num
//  increase quantity by 1 over and over until it is equal or larger than input num
//    mean while recursively call with array of coins sliced at this position and num - coin * quantity
//    
//    



var makeChange = function(amount, coinArray, comboStr){
  coinArray = coinArray || [200, 100, 50, 20, 10, 5, 2, 1];
  if (coinArray.length === 0 && amount > 0) {
    return 0;
  } else if (amount === 0 && coinArray.length < 8) {
    return 1;
  }
  comboStr = comboStr || '';
  var curCoinType;
  var totalCombo = 0;
  for (var i = 0; i < coinArray.length; i++){
    curCoinType = coinArray[i];
    if (amount >= curCoinType) {
      var quantity = 1;
      while (amount >= curCoinType * quantity) {
        var curStr = curCoinType + ' * ' + quantity;
        curStr = comboStr ? comboStr + ' + ' + curStr : curStr;
        if (amount === curCoinType * quantity) {
          console.log(curStr);
        }
        totalCombo += makeChange(amount - curCoinType * quantity, coinArray.slice(i + 1), curStr);
        quantity++;
      }
    }
  }
  return totalCombo;
};

var makeChange = function(amount, coinArray){
  coinArray = coinArray || [200, 100, 50, 20, 10, 5, 2, 1];
  if (coinArray.length === 0 && amount > 0) {
    return 0;
  } else if (amount === 0 && coinArray.length < 8) {
    return 1;
  }
  var curCoinType;
  var totalCombo = 0;
  for (var i = 0; i < coinArray.length; i++){
    curCoinType = coinArray[i];
    if (amount >= curCoinType) {
      var quantity = 1;
      while (amount >= curCoinType * quantity) {
        totalCombo += makeChange(amount - curCoinType * quantity, coinArray.slice(i + 1));
        quantity++;
      }
    }
  }
  return totalCombo;
};

makeChange(5);
