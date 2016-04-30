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
