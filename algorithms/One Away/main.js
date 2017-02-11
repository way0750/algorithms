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

let oneAway = (str1, str2) => {
  if (Math.abs(str1.length - str2.length) > 1) {
    return false;
  }

  let editingAmount = 0;
  if (str1.length === str2.length) {
    for (let i = 0 ; i < str1.length; i++) {
      if (str1[i] !== str2[i]) editingAmount++;
      if (editingAmount > 1) return false;
    }
    return true;
  } else {
    let [ longStr, shortStr ] = str1.length > str2.length
                            ? [str1, str2]
                            : [str2, str1];

    for (let i = 0 ; i < longStr.length; i++) {
      let newStr = longStr.slice(0, i) + longStr.slice(i+1);
      if (newStr === shortStr) return true;
    }
    return false;
  }
}
