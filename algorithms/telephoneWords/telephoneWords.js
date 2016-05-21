/*
  * Each number key on a standard phone keypad has a set of Latin letters written on
  * it as well: http://en.wikipedia.org/wiki/File:Telephone-keypad2.svg
  *
  * Businesses often try to come up with clever ways to spell out their phone number
  * in advertisements to make it more memorable. But there are a lot of combinations!
  *
  * Write a function that takes up to four digits of a phone number, and
  * returns a list of all of the words that can be written on the phone with
  * that number. (You should return all permutations, not only English words.)
  *
  * Example:
  *   telephoneWords('2745');
  *   => ['APGJ',
  *        'APGK',
  *        'APGL',
  *        ..., // many many more of these
  *        'CSIL']
  *
  * Tips:
  *   - Phone numbers are strings! (A phone number can start with a zero.)
  *   - The digits 0 and 1 do not have letters associated with them, so they should be left as numbers.
  *   - Don't return every combination of those digits in any order, just the order given.
  *
  *  Extra credit: There's a list of English dictionary words at /usr/share/dict/words .
  *  Why not filter your results to only return words contained in that file?
  *
  */

var phoneDigitsToLetters = {
  0: '0',
  1: '1',
  2: 'ABC',
  3: 'DEF',
  4: 'GHI',
  5: 'JKL',
  6: 'MNO',
  7: 'PQRS',
  8: 'TUV',
  9: 'WXYZ'
};
//if only one number: 5
//then ['J', 'K', 'L']
//if 45: then add each char from 4 to all of 5s
//then G: ['GJ', 'GK', 'GL']
//H: ['HJ', 'HK', 'HL']
//I: ['IJ', 'IK', 'IL']
//concat all of them and return!
//what if no input numbers at all? then ['']?
//
//recursion:
//base case: input string is empty return [''] it is a permutation of nothing
//how to break problem smaller: slice the input string at index 1
//what to return always: an array of string, each is a permutation
//what to do about the return:
//  add each of the letter associating with current number to all the return permutations
//  concat all permutations in single array and return it.


//only finding all the permutations
let telephoneWords = (numStr) => {
  if (numStr.length < 1) {
    return [''];
  }
  let curNumChars = phoneDigitsToLetters[numStr[0]];
  let allSubPermut = telephoneWords(numStr.slice(1));
  return curNumChars.split('')
                    .reduce( (allpermut, char) => {
                      let newPermutes = allSubPermut.map((singlePermut) => {
                        return char + singlePermut;
                      });
                      return allpermut.concat(newPermutes);
                    }, []);
};

//also find the one that exists in the dictionary
//don't try to find all permutations first then check if certain permutation exist
//make permutations and check and at the same time while it is at the top most stack

//turn the word list into an object:
var fs = require('fs');
var wordStr= fs.readFileSync('/usr/share/dict/words', 'utf8').toUpperCase();
var wordObj = wordStr.split('\n').reduce((record, word) => {
  record[word] = true;
  return record;
}, {});

let realTelephoneWords = (numStr, depth) => {
  depth = depth === undefined ? 0 : depth + 1;
  if (numStr.length < 1) {
    return [''];
  }
  let curNumChars = phoneDigitsToLetters[numStr[0]];
  let allSubPermut = telephoneWords(numStr.slice(1));
  return curNumChars.split('')
                    .reduce( (allpermut, char) => {
                      // let newPermutes = allSubPermut.map((singlePermut) => {
                      //   return char + singlePermut;
                      // });
                      let realWordPermute = allSubPermut.reduce((selectedPermutes, singlePermut) => {
                        let newPermute = char + singlePermut;
                        if (depth === 0 ) {
                          return wordObj[newPermute] ? selectedPermutes.concat(newPermute) : selectedPermutes;
                        } else {
                          return selectedPermutes.concat(newPermute);
                        }

                      }, []);
                      return allpermut.concat(realWordPermute);
                    }, []);
};

console.log(realTelephoneWords('9255464'));
