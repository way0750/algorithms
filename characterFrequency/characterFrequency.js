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
