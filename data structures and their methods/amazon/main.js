/*
   find path between two words
   you can add remove characters on both words, but each edit should
   yeild a dictionary word

   words should be connected by difference in length and letter composition
   a - ab doesn't connect to able
   e - le - ble - able
   a - '' - e

   able connects to ab like this:
   able - ble - le - e - '' - a - ab

   every word by
   switching, adding, or deleting one character will yield another word
   but what if it doesn't?

   switching each character with a-z
   greatness
   areatness
   breatness
   creatness
   dreatness
   ...
   zreatness
   then
   greatness

   delete one character
   reatness
   geatness
   gratness
   gretness
   greaness
   greatess
   greatnss
   greatnes
   greatnes

   add one character until it is 30 character long?
   greatnessa
   greatnessb
   greatnessc
   .....
   20 * 26

   add each word to a graph and a hash table
   then connect all of them
   go through the hash table to connect to each and every single word
   o


   concept proof this first, put each word from the word file
   into a hash then see if you can connect greatness to any of them
*/


let fs = require('fs');
let words = fs.readFileSync('./web2', 'utf8').split('\n');
words.pop() // pop the last line

let dict = words.reduce((record, word) => {
  word = word.toLowerCase();
  record[word] = word;
  return record;
}, {});

let findConnection = function(word, dict) {
  //adding: adding one to front and/or one to back
  //subtracting
  //replacing

  let chars = word.toLowerCase().split('');

  //subtracting
  let found = chars.reduce((foundWords, _, i) => {
    let newWord = word.slice(0, i) + word.slice(i + 1);
    console.log('subtracting :', newWord)
    let foundWord = dict[newWord];
    return foundWord ? foundWords.concat(foundWord) : foundWords;
  }, []);

  //replacing
  let loopThroughChars = (cb, num = 97) => {
    if (num > 122) return;
    cb(String.fromCharCode(num));
    loopThroughChars(cb, ++num);
  };

  found = chars.reduce((foundWords, _, i) => {
    let curChar = chars[i];
    loopThroughChars((char) => {
      if (char !== curChar) {
        let newWord = chars.slice(0, i).join('')
          + char
          + chars.slice(i + 1).join('');
        console.log('replacing :', newWord)
        if (dict[newWord]) foundWords.push(dict[newWord]);
      }
    });
    return foundWords;
  }, found);

  // adding: adding one char(from a to z) to each position
  // cat: 1c2a3t4

  let addingChars = (str, charIndex = 0) => {
    let arr = [];
    loopThroughChars((char) => {
      let newWord = str.slice(0, charIndex)
        + char
        + str.slice(charIndex);
      console.log('adding :', newWord);
      if (dict[newWord]) arr.push(newWord);
    });
    ++charIndex
    return charIndex <= str.length
         ? arr.concat(addingChars(str, charIndex))
         : arr;
  };

  found = found.concat(addingChars(word));
  console.log('\n----------\n');
  console.log(`dictionary words that are one edit away for "${word}", ${found.length} of them: `, found);
  console.log('\n----------\n');
}

findConnection('hardware', dict);
