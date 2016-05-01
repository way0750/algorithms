/**
 * Write a function `f(a, b)` which takes two strings as arguments and returns a
 * string containing the characters found in both strings (without duplication), in the
 * order that they appeared in `a`. Remember to skip spaces and characters you
 * have already encountered!
 *
 * Example: commonCharacters('acexivou', 'aegihobu')
 * Returns: 'aeiou'
 *
 * Extra credit: Extend your function to handle more than two input strings.
 */

var commonCharacters = function(string1, string2) {
	if (string2 === undefined){return string1;}
	
	string1 = string1.split('');
	string2 = string2.split('');

	var str2Obj = string2.reduce(function (obj, char) {
		obj[char]=true;
		return obj;
	}, {});

	var finalStr = string1.filter(function (char) {
		return str2Obj[char];
	}).join('');

	var args = Array.apply(null, arguments).slice(2);
	args.unshift(finalStr);
	
	return commonCharacters.apply(null, args);

};



//second version:
/**
 * Write a function `f(a, b)` which takes two strings as arguments and returns a
 * string containing the characters found in both strings (without duplication), in the
 * order that they appeared in `a`. Remember to skip spaces and characters you
 * have already encountered!
 *
 * Example: commonCharacters('acexivou', 'aegihobu')
 * Returns: 'aeiou'
 *
 * Extra credit: Extend your function to handle more than two input strings.
 */


// create obj with character as key, true as value
// also create uniq str for that obj

function createRecord (str) {
  var objRecord = {};
  for(var i = 0; i < str.length; i++){
    objRecord[str[i]] = true;
  }
  return objRecord;
}

function commonCharacters (str1, str2) {
  if (str2 === undefined) {
    return str1;
  }
  var objRecord = createRecord(str2);
  var finalStr = "";
  var objRecord2 = {};
  for (var j = 0; j < str1.length; j++){
    var char = str1[j];
    if (objRecord[char] && (!objRecord2[char]) ){
      finalStr += char;
      objRecord2[char] = true;
    }
  }
  
  var otherStrs = Array.apply(null, arguments).slice(2);
  otherStrs.unshift(finalStr);
  
  return commonCharacters.apply(null, otherStrs);
}

commonCharacters('abcdefg', 'abc', 'aaa');
