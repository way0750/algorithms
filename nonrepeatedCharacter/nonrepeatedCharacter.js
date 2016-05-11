/**
 * Given an arbitrary input string, return the first nonrepeated character in
 * the string. For example:
 *
 *   firstNonRepeatedCharacter('ABA'); // => 'B'
 *   firstNonRepeatedCharacter('AACBDB'); // => 'C'
 */


let firstNonRepeatedCharacter = (string) => {
  let record = {uniq: []};
  for (let i = 0; i < string.length; i++){
    let char = string[i];
    record[char] = (record[char] || 0) + 1;
    if (record[char] === 1) {
      record.uniq.push(char);
    }
  }

  return record.uniq.find( (ele) => {
    return record[ele] === 1;
  });
};

firstNonRepeatedCharacter('AACBDB'); // => 'C'

// I just have to do this with regular expression:
// this is not recommended for production!

let usingRegExp = (str) => {
  let record = {uniq: []};
  while (str) {
    let char = str[0];
    let regExp = new RegExp(char, 'g');
    record[char] = str.match(regExp).length;
    str = str.replace(regExp, '');
    record.uniq.push(char);
  }
  console.log(record);
  return record.uniq.find( (ele) => {
    return record[ele] === 1;
  });
};

usingRegExp('AACBDB'); // => 'C'
