function groupByLength (arr) {
  return arr.reduce(function (arr, str) {
    var index = str.length;
    arr[index] = arr[index] ? arr[index].concat(str) : [str];
    return arr;
  }, []);
}

function makeFreq (str) {
  var wordFreq = {};
  var curWord = '';
  var curChar = '';

  var addToWordFreq = function (curWord) {
    wordFreq[curWord] = wordFreq[curWord] ? ++wordFreq[curWord] : 1;
  };

  for (var i = 0; i < str.length; i++) {
    curChar = str[i].toLowerCase();
    if (/\w/.test(curChar)) {
      curWord += curChar;
      if (i === str.length-1) {addToWordFreq(curWord);}
    } else if (curWord.length > 0) {
      addToWordFreq(curWord);
      curWord = '';
    }
  }
  wordFreq.sortedWords = groupByLength(Object.keys(wordFreq));
  return wordFreq;
}

function wordFreqStat (str) {
  var wordFreqObj = makeFreq(str);
  var allWords = wordFreqObj.sortedWords;

  allWords = allWords.reduce(function (finalArr, sameLengthWords) {
    return finalArr.concat(sameLengthWords);
  }, []);

  var curWord = '', curSimilarWords = [];
  var finalObj = {};

  while(allWords.length) {
    if (!curWord.length) {
      curWord = allWords.shift();
      curSimilarWords.push(curWord);
    }
      var i = 0;
      while ( allWords[i] && allWords[i].length < curWord.length+4) {
        if (allWords[i].search( new RegExp(curWord)) === 0 ){
          curSimilarWords.push(allWords[i]);
          allWords.splice(i, 1);
          i--;
        }
        i++;
      }

      finalObj[curSimilarWords.join('|')] = curSimilarWords.reduce(function (sum, word) {
        return sum += wordFreqObj[word];
      }, 0);
      curWord = "";
      curSimilarWords = [];

  }
    return finalObj;
}
