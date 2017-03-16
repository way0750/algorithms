/*
  All DNA is composed of a series of nucleotides abbreviated as A, C, G, and T,
    for example: "ACGAATTCCG". When studying DNA, it is sometimes useful to
    identify repeated sequences within the DNA.

  Write a function to find all the 10-letter-long sequences (substrings) that
    occur more than once in a DNA molecule.

  For example,

  Given s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT",

  Return:
  ["AAAAACCCCC", "CCCCCAAAAA"].

  if string is less than 10 chars return [];
   else loop from index 9 to the end and get sub strings along the way
     add substring, if found add to arr, not found then add string as key
     value of true;
   return arr;
*/

let getRepeatedString = function(str) {
  let arr = [];
  let record = {};
  if (str.length < 11) return arr;

  for (let i = 10; i < str.length; i++) {
    let curSubStr = str.substr(i - 10, 10);
    record[curSubStr] = (record[curSubStr] || 0) + 1;
    if (record[curSubStr] === 2) arr.push(curSubStr);
  }

  return arr;
};
