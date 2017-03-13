/**
 * Given a single input string, write a function that produces all possible
 * anagrams
 * of a string and outputs them as an array. At first, don't worry about
 * repeated strings.  What time complexity is your solution?
 *
 * Extra credit: Deduplicate your return array without using uniq().
 */

/**
  * example usage:
  * var anagrams = allAnagrams('abc');
  * console.log(anagrams); // [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]

 */


function allAnagrams(string) {
  if (!string.length) {
    return [''];
  }
  const curChar = string[0];
  const shortPermuts = allAnagrams(string.slice(1));
  return shortPermuts.reduce(function(finalPermuts, curShortPermut) {
    // make new permutations here by walking curChar through the short permutation
    const newPermuts = [];
    for (let i = 0; i <= curShortPermut.length; i++) {
      let leftStr = curShortPermut.slice(0, i);
      let rightStr = curShortPermut.slice(i);
      newPermuts.push(leftStr + curChar + rightStr);
    }

    return finalPermuts.concat(newPermuts);
  }, []);
}

// use recursion?
// could but don't have to

// what if have to?
// base case/recursive case?

// base case input is empty string, return the empty string
//   the anagrams of an empry string is an empty string

// what to return all the time? and array of strings (aka the permutations/anagrams)
// what to do about the return?
//  there will be a current letter, add current lettet to each position in each string
// in the return array. each addition yeild one new permutation





// var allAnagrams = function(string) {
//   if (string.length < 2) {
//     return [string];
//   }

//   var curChar, remainChar;
//   var allPermutes = [], subPermutes;
//   var record = {};
//   for (var i = 0; i < string.length; i++) {
//     curChar = string[i];
//     if (!record[curChar]){
//       record[curChar] = true;
//       remainChar = string.slice(0, i) + string.slice(i+1);
//       subPermutes = allAnagrams(remainChar);
//       subPermutes.forEach(function (subPermuteStr) {
//         allPermutes.push(curChar + subPermuteStr);
//       });
//     }
//   }
//   return allPermutes;
// };

// basic idea:
// base case: input string length < 2
// how to break problem smaller: slicing string at index 1
// what to return: always an array of strings
// what to do with return: for each string in the array, add current character
// to each index of the string including the index at length + 1




function allAnagrams (str) {
  //base case: if input str is empty or length of 1, return it in an array as a
  // collection of just one permutation
  if (str.length < 2) {
    return [str];
  }
  var curChar = str[0];
  var remainStr = str.slice(1);

  //get sub permutations:
  var subAnagrams  = allAnagrams(remainStr);
  return subAnagrams.reduce( function (allAna, str) {
    for (var i = 0; i <= str.length; i++){
      //add curChar to each index of str to create new permutation:
      //ex: curChar: 'a', str: 'bc'
      //then: 'abc', 'bac', 'bca'
      var newPermu = str.slice(0, i) + curChar + str.slice(i);
      allAna.push( newPermu );
    }
    return allAna;
  }, []);
}

//beware of super long strings, it will use up a lot of memory!!!
//allAnagrams('abc');
//allAnagrams('abcdefg');
