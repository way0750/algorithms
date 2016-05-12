/**
* Extend the Number prototype with a new method called `toEnglish`.
* It should return the number as a string using English words.
* Examples:
*   (7).toEnglish(); // > "seven"
*   (575).toEnglish(); // > "five hundred seventy-five"
*   (78193512).toEnglish(); // > "seventy-eight million one hundred ninety-three thousand five hundred twelve"
*
* Extra credit: Make your function support decimals.
* Example:
*   (150043.273).toEnglish() // > "one hundred fifty thousand forty-three and two hundred seventy three thousandths"
*
 */

var numbersToWords = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
  30: 'thirty',
  40: 'forty',
  50: 'fifty',
  60: 'sixty',
  70: 'seventy',
  80: 'eighty',
  90: 'ninety',
};

var numbersToPlace = {
  10: 'ten',
  100: 'hundred',
  1000: 'thousand',
  1000000: 'million',
  1000000000: 'billion',
  1000000000000: 'trillion',
  1000000000000000: 'quadrillion',
  1000000000000000000: 'quintillion',
};




// 314 345 45 14 
// should read from right to left for every group of 3 digits
// 14  4: four 1 then one but since 1 is at second place from right, that means it is a teen number
// so replace 4 with fourteen
// 45:    5: five, 4*10: forty add them together forth-five
// so reverse the string first?
// 
// 314 -> 413 then 4*1 = 4 = four 1*10 = 10 = ten but 1 is at index 1 so it is 10+4=14 = fourteen, then 3 * 100 = 300 === 3 hundred
// place = 1
// 4 * (numbersToPlace[place] || 1)  = 4 = four
// 1 * (numbersToPlace[10] || 1 )
// ....
// 
// 345 -> 543
// recreate numbersToPlace to
// ['', thousand']
// place = 1
// 5 * 1 = 5 read five
// ++place
// 4 * 10 = 40 read forty
// ++place
// 3 * 100 = 300 read nothing, so read 'three' first then read hundred concat them 'three hundred'
// five, forty, three hundred,
// reverse and concat into string
// three hundred and forty-five
// so reverse num and slice into group of 3:
//  3458769
//  9678543
//  967 854 3
//  967 nine sixty seven hundred: seven hundred sixty-nine
//  854 eight fifty four hundred: four hundred fifty-eight
//  3: three
// seven hundred sixty-nine, four hundred fifty-eight, three
// use better numberToPlace:
// seven hundred sixty-nine, four hundred fifty-eight thousand, three million
// reverse
// three million four and hundred fifty-eight thousand seven hundred and sixty-nine
