/* There are three types of edits that can be performed on strings:
   insert a character, remove a character, or replace a character.
   Given two strings, write a function to check
   if they are one edit (or zero edits) away.
   pale, pale true
   pales, pale true
   pale, bale true
   pale, bae false


   don't use brute force, it can take way tooooo long
   since there can be no more than 1 edit away
   we can simple return false if the length differnce is more than 1

   then from here on strings will be either same length or different by 1
   if same length we can just compare each characters one by one see how many
   differnce we can find
   if off by 1
     then delete one character from the longer one then compare
     try to delete different character each time
   so there is going to be looping too
*/

let oneAwayFirstDraft = (str1, str2) => {
  let editingAmount = 0;
  if (str1.length === str2.length) {
    for (let longIndex = 0 ; longIndex < str1.length; i++) {
      if (str1[longIndex] !== str2[longIndex]) editingAmount++;
      if (editingAmount > 1) return false;
    }
    return true;
  } else if (Math.abs(str1.length - str2.length) === 1) {
    let [ longStr, shortStr ] = str1.length > str2.length
                            ? [str1, str2]
                            : [str2, str1];

    for (let longIndex = 0 ; longIndex < longStr.length; i++) {
      let newStr = longStr.slice(0, longIndex) + longStr.slice(i+1);
      if (newStr === shortStr) return true;
    }
    return false;
  }

  return false;
}

/*
  time and space
  if lengths are the same, then n
  if lengths are off by 1, then the longest
  so all and all, the longest

  space:
  if same length, then constant
  if off by one, you need to create longStr and shortStr and newStr
   of which the longStr takes the most space by 1
   short + short + short + 1
   3short + 1
   short
   all and all
   the longest string
*/


/*
   have two indexes
   then loop through the longest string
   compare long at index to short at index
   if different then increment the long index by 1
   then if long index - short index > 1
   return false because more than two edits will be needed
*/

let oneAway = (str1, str2) => {
  if (Math.abs(str1.length - str2.length) > 1) return false;

  let stopAllowence = Math.abs(str1.length - str2.length);
  let difference = 0;
  let [longStr, shortStr] = str1.length > str2.length
  ? [str1, str2]
  : [str2, str1];

  let shortIndex = 0;
  for (let longIndex = 0; longIndex < longStr.length; longIndex++) {
    if (longStr[longIndex] !== shortStr[shortIndex]) {
      difference++;
      if (stopAllowence--) {
        shortIndex--;
      }
    }
    if (difference > 1) {
      return false;
    }
    shortIndex++;
  }
  return true;
}
