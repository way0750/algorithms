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

// console.log(data[0]);
console.log(longestSubStr.apply(null, data));
