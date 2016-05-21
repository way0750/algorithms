/**
 * Write a function that takes a number as its argument and 
 * returns a string that represents that number's simplified fraction.
 *
 * Example: toFraction(0.5) === '1/2'
 * 
 * Whole numbers and mixed fractions should be returned as irregular fractions
 * 
 * Example: toFraction(3.0) === '3/1'
 * 
 * Example: toFraction(2.5) === '5/2'
 *
 * keep mutiplying the number until it isn't a float number anymore
 * then return that product along 
 *be careful of 367.20000000000005
 *round to 13
 *number.round(13)
 *
 * 1,3,7,9 to get zero you need 10
 * 5 need 2
 * 2,4,6,8 to get zero you need 5
 * 0 need 1
 *
 * for each number just times the the above numbers
 * go through each float digits and times: 10 for 1,3,7,9, 2 for 5, 5 for 2,4,6,8
 *
 * 0.3705
 *
 * from right to left:
 * 2: 0.741
 * 10: 7.41
 * 10: 74.1
 * 10: 741
 *
 * 10*10*10*2 = 2000
 *
 * 0.425
 * 2 : 0.85
 * 2 : 1.7
 * 10 : 17
 *
 * 0.253213
 * 10 : 2.53213
 * if ends in 1,3,7,9 then just simply return 10^floatAmount
 * if ends in any others then use the above formular
 * 
 *
 * 
 * 
 */

var toFraction = function(number) {
  
  var n = 1;
  while (( number*n )%1>0){
    n+=1;
  }

  return ''+number*n+'/'+n;

};


//second version

function toFractionSecondVersion (num) {
  var numStr = num.toString(10);
  var compos = numStr.split('.');
  var leftNum = +compos[0];
  var float = (compos[1] || '').replace(/0+$/, '');
  var round = float.length;
  var denominator = 1;

  console.log(round, float);
  for (var i = 0; i < round; i++){
    var lastNum = float[float.length - 1];
    var multiple;
    if (/[1379]/.test(lastNum)){
      multiple = 10;
    } else if (/[2468]/.test(lastNum)){
      multiple = 5;
    } else {
      multiple = 2;
    }
    denominator *= multiple;
    console.log('float: ', float, ' last num: ', lastNum, multiple);
    float = float * multiple / 10 + '';
  }

  return leftNum * denominator + (+float) + '/' + denominator;

}
var num = 0.444333744;

toFractionSecondVersion(num);
