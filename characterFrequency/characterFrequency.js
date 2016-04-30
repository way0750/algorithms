/*
 *  Write a function that takes as its input a string and returns an array of
 *  arrays as shown below sorted in descending order by frequency and then by
 *  ascending order by character.
 *
 *       :: Example ::
 *
 *  characterFrequency('mississippi') ===
 *  [
 *    ['i', 4],
 *    ['s', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *       :: Example2 ::
 *
 *  characterFrequency('miaaiaaippi') ===
 *  [
 *    ['a', 4],
 *    ['i', 4],
 *    ['p', 2],
 *    ['m', 1]
 *  ]
 *
 *       :: Example3 ::
 *
 *  characterFrequency('mmmaaaiiibbb') ===
 *  [
 *    ['a', 3],
 *    ['b', 3],
 *    ['i', 3],
 *    ['m', 3]
 *  ]
 *
 */






//first attemp:



var partition = function(arr, callBack){
  var result = [], curItem, index;
  for (var j = 0 ; j<arr.length; j++){
    curItem = arr[j];
    index = callBack(curItem);
    if (result[index]){
      result[index].push(curItem);
    } else {
      result[index] = [curItem];
    }
  }
  return result;
};

var characterFrequency = function(string) {
  var freqObj = {uniq:[]}, curChar;
  for(var i = 0; i < string.length; i++){
    curChar = string[i];
    if (freqObj[curChar]){
      freqObj[curChar]++;
    } else {
      freqObj[curChar] = 1;
      freqObj.uniq.push(curChar);
    }
  }

  var partitionArr = partition(freqObj.uniq, function(v){
    return freqObj[v];
  });

  var orderByFreqAndAlpha = partitionArr.reduceRight(function(memo, arr){
    return memo.concat(arr.sort());
  }, []);

  return orderByFreqAndAlpha.map(function(char){
    return [char, freqObj[char]];
  });
};





//second 

function groupBy (obj, cb) {
  var keys = Object.keys(obj);
  return keys.reduce (function (group, key) {
    var groupKey = cb(key, obj[key]);
    group[groupKey] = group[groupKey] || [];
    group[groupKey].push(key);
    return group;
  }, {});
}

function getFreq (str) {
  str = str.toLowerCase();
  var freq = {};
  var char;
  for (var i = 0; i < str.length; i++){
    char = str[i];
    freq[char] = freq[char] ? freq[char] + 1 : 1;
  }
  return freq;
}

function characterFrequency (str) {
  var freqObj = getFreq(str);
  var groupByFreq = groupBy(freqObj, function (key, value) {
    return value;
  });
  //groupByFreq should look like this:
  //{
  //  1: [a,b,c,d],
  //  2: [n, m],
  //  90: [z,x,y]
  //}
  //sort obj keys in descending order, then sort each key's characters in ascending order
  var sortedKeys = Object.keys(groupByFreq).sort(function (k1, k2) {
    return +k2 > +k1;
  });
  
  return sortedKeys.reduce(function (finalArr, key) {
    var sortedChars = groupByFreq[key].reduce (function (arr, char) {
      arr[char.charCodeAt(0)] = [char, +key];
      return arr;
    }, []);
    //sortedChars should look like this: [,, ,['d', 3] , , ['f', 2]];
    sortedChars.forEach(function(reqArr) {
      finalArr.push(reqArr);
    });
    return finalArr;
  }, []);

}

characterFrequency('fuakshdljkfhjashdfajsdfjhajsdhfjahsdfffaa');

