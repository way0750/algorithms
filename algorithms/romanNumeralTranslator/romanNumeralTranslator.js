
/**
 * Given a roman numeral as input, write a function that converts the roman
 * numeral to a number and outputs it.
 *
 * Ex:
 * translateRomanNumeral("LX") // 60
 *
 * When a smaller numeral appears before a larger one, it becomes
 * a subtractive operation. You can assume only one smaller numeral
 * may appear in front of larger one.
 *
 * Ex:
 * translateRomanNumeral("IV") // 4
 *
 * You should return `null` on invalid input.
 */

var DIGIT_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};


// let sum equal to 0
// loop through the string one by one
// get value for current character from digit_values
//  if not found, return null
//  if found add to sum
//  compare current character value to last character value
//    if larger then sum - last character value * 2;
// return sum

let translateRomanNumeral = (str) => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    let curCharValue = DIGIT_VALUES[str[i]];
    if (curCharValue === undefined) {
      return null;
    } else {
      sum += curCharValue;
      let lastCharValue = DIGIT_VALUES[str[i-1]] || Infinity;
      if (curCharValue > lastCharValue) { sum -= lastCharValue*2; }
    }
  }
  return sum;
};

translateRomanNumeral("IV"); // 4
