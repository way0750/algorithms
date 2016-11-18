// Problem

// A common substring of a collection of strings is a substring of every member of the collection. We say that a common substring is a longest common substring if there does not exist a longer common substring. For example, "CG" is a common substring of "ACGTACGT" and "AACCGGTATA", but it is not as long as possible; in this case, "GTA" is a longest common substring of "ACGTACGT" and "AACCGTATA".

// Note that the longest common substring is not necessarily unique; for a simple example, "AA" and "CC" are both longest common substrings of "AACC" and "CCAA".

// Given: A collection of kk (k≤100k≤100) DNA strings of length at most 1 kbp each in FASTA format.

// Return: A longest common substring of the collection. (If multiple solutions exist, you may return any single solution.)

// Sample Dataset:
// >Rosalind_1
// GATTACA
// >Rosalind_2
// TAGACCA
// >Rosalind_3
// ATACA
// 
// 
// Sample Output
// AC


let fs = require('fs');
let data = fs.readFileSync('rosalind_lcsm.txt', 'utf8');
data = data.split(/\>.+/).slice(1);
data = data.map((str) => {
  return str.replace(/\n/g, '');
});

function subStrRecord (str) {
  let record = {};
  for(let i = 0; i < str.length; i++){
    let firstLetter = str[i];
    record[firstLetter] = record[firstLetter] || {};
    for (let j = i+1; j <= str.length; j++){
      let subStr = str.slice(i, j);
      record[firstLetter][subStr] = record[firstLetter][subStr] || true;
    }
  }
  return record;
}

function longestSubStr(str1) {
  if (arguments.length < 2) {
    return arguments.length === 1 ? str1 : null;
  }

  let record = subStrRecord(str1);
  let otherStrings = Array.apply(null, arguments).slice(1);
  
  otherStrings.forEach((str)=> {
    let allRecordKeys = Object.keys(record);
    console.log(allRecordKeys.reduce((amount, curletter) => {
      return Object.keys(record[curletter]).length + amount;
    }, 0));
    //loop through all keys and all the substring within it
    record = allRecordKeys.reduce((newRecord, firstLetter)=> {
      if (str.search(firstLetter) === -1 ){
        return newRecord;
      } else {
        //the first letter is found, then search all substring that starts with it
        let subStrs = Object.keys(record[firstLetter]);
        subStrs.forEach((subStr) => {
          //check each subStr against the str
          if (str.search(subStr) > -1) {
            newRecord[firstLetter] = newRecord[firstLetter] || {};
            newRecord[firstLetter][subStr] = true;
          }
        }); 
        return newRecord;
      }
    }, {});
  });

  return Object.keys(record).reduce((longestSubString, firstLetter)=>{
    Object.keys(record[firstLetter]).forEach((subStr) => {
      if (subStr.length > longestSubString.length){
        longestSubString = subStr;
      }
    });
    return longestSubString;
  }, "");
}

console.log(longestSubStr.apply(null, data));
