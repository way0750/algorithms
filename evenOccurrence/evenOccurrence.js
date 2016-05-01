/*
 * Find the first item that occurs an even number of times in an array.
 * Remember to handle multiple even-occurrence items and return the first one. 
 * Return null if there are no even-occurrence items.
*/

/*
 * example usage:
 * var onlyEven = evenOccurrence([1, 7, 2, 4, 5, 6, 8, 9, 6, 4]);
 * console.log(onlyEven); //  4
*/

var evenOccurrence = function(arr) {
  //set record object for holding occurrence info. 
  var record = {uniq : []};

  //record occurrence for each item
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    if (record[item] !== undefined){
      record[item]++;
    } else {
      record[item] = 1;
      record.uniq.push(item);
    }
  }

  //find first item that repeats itself even amount of times
  for (var i = 0; i < record.uniq.length; i++) {
    var uniqItem = record.uniq[i];
    if (record[uniqItem]%2===0){return uniqItem;}
  }
  //if none is found, return null;
  return null;

};



function evenOccurrence(array) {
  var occr = {};
  var uniqNums = array.filter(function (num) {
    occr[num] = occr[num] ? occr[num] + 1 : 1;
    return occr[num] === 1;
  });
  
  for (var i = 0; i < uniqNums.length; i++){
    var key = uniqNums[i];
    if (occr[key] % 2 === 0) {
      return key;
    }
  }
  return null;
}

evenOccurrence([1, 7, 2, 4, 5, 6, 8, 9, 6, 4]);


function evenOccurrence(arr) {
  var freqObj = arr.reduce(function (obj, num) {
    obj[num] = obj[num] ? obj[num] + 1 : 1;
    if (obj[num] === 1) {
      obj.uniq.push(num);
    }
    return obj;
  }, {uniq: []});
  var firstEven = null;
  for (var i = 0; i < freqObj.uniq.length; i++){
    var num = freqObj.uniq[i];
    if (freqObj[num] % 2 === 0){
      return num;
    }
  }
  return firstEven;
}

evenOccurrence([1, 7, 2, 4, 5, 6, 8, 9, 6, 4]);
