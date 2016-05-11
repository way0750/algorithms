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
