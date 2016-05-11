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

var betterNumbersToPlace = [
'', 'thousand', 'million', 'billion','trillion','quadrillion','quintillion'
];

var hey;
Number.prototype.toEnglish = function () {
  var groups = breakIntoGroup(this.valueOf());
  groups = groups.map(function (group, i) {
    return convertToString(group) + ' ' + betterNumbersToPlace[i] ;
  });
  return groups.reverse().join(' ').trim();
};


var breakIntoGroup = function (num) {
  num = num+'';
  num = num.split('');
  var tempGroup = [];
  var groupSize = 0;
  var groups = [];
  for (var i = num.length-1; i > -1; i--){
    var curNum = num[i];
    tempGroup.unshift(curNum);
    groupSize++;
    if (groupSize === 3) {
      groups.push(tempGroup);
      tempGroup = [];
      groupSize = 0;
    }
  }
  if (tempGroup.length){
    groups.push(tempGroup);
  }
  return groups;
};

var convertToString = function (arr) {
  var finalStr = '';
  var round = 1;
  for (var i = arr.length-1; i > -1; i--){
    if (arr[i] == '0' ) {round++; continue;}
    if (round === 1){
        finalStr = numbersToWords[arr[i]];
    } else if (round === 2 && arr[i] == '1'){
      finalStr = numbersToWords[arr[i]+""+arr[i+1]];
    } else if (round === 2) {
        var separator = '';
        if (finalStr !== '') {separator = '-';}
      finalStr = numbersToWords[arr[i]*10] + separator + finalStr;
    } else if (round === 3){
      finalStr =  numbersToWords[arr[i]] + ' hundred ' + finalStr; 
    }
    round++;
  }

  return finalStr.trim();
};
