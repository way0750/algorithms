/*

A message containing letters from A-Z is being encoded to numbers using the
   following mapping:

'A' -> 1
'B' -> 2
...
  'Z' -> 26
Given an encoded message containing digits, determine the total number of ways
   to decode it.

  For example,
  Given encoded message "12", it could be decoded as "AB" (1 2) or "L" (12).

    The number of ways decoding "12" is 2.

   input "12":
   if 1, then 2, 2 returns 1 for finding 1 way
   if 12 then '', return 1 for finding 1 way?
   now we have 1 + 1 = 2 ways for input: '12'

   input "99"
   if 9 then 9, return 1 for finding 1 way
   if 99 then '', return 1????

   input could be '', '1'
   if '', it should always return 0?
   when one character, there will be 1 way
   when two character2, may or may not: 

   so baiscally try all possible comboes from left to right
   ex: 123
   1 2 3
   1 23
   12 3

   but what would be the basic cases? it can't be from 0 to 1341325234563574567
   that would be way much
   how about top-down instead of bottom up from 0 to n
   if 123:
   1 then recursively call 23, check 23 see if anything found in a cache, if not
   then try to find amount of ways with 23
   try 2 then 3
   then try 23 to see if anything found if not then make new key for 2, 3,
   and 23

   so top down and recursively solve this:
   base case: we will slice the string 1 or 2 characters at the time, eventually
     we will end up with 1 length string or '' as input
     so let that be base case: 1 length string or '': if '' return 0, if 1 then
     you will only have 1 to 9 which will give you a letter, so return 1
     or if not 1 length string or '', but the input string is found in the cache
     return that
     all the numbers returned mean the amount of ways to decode a string;
   how to make problem smaller:
     slice stirng at next next index, ex: if 123, slice at 3, and you get
       12 and 3
       no need to check 1, since there has to be a letter for number 0 to 9
       but do check 12
   what to return: always a nubmer, it means the amount of ways you can decode a
     sub string
   what to do with return: add 1 to it, if the 2 length cur string is a letter
     add another 1, then add this number to the cache with current input string
     as key for potential future reuse
     return return that number;






   wiat a minute:
   what if "123" and the dynamic way is 3, then 23, then 123
   so build table:
   key   amount
   3     1
   23    2 for 2 3: 1, 23: 1
   123   1, 23(2), then 1, 2, 3 also works: 1. so 2 + 1 === 3
   such as 1 2 3, 12 3, 1 23

   then return cache['123'], which is 3

   so
   base cases:
      if found in cache, return value;
      if empty string, put it in cache then return 0;
      if length of 1, put it in cache then return 1
      if length of 2 and less than 27 put it in cache return 1 else 0;
   make the problem smaller: slice input string at 1, then at 2
      ex: if 123, 1, 23 then 12, 3
      if when slicing at 2 the current string 0...2 is larger than 26
        no need to recursively call it is a no letter
   what to return: always a number;
   what to with return: declear a variable name amount, and add
     the returned number to it, then add current input as key, and amount
     as value to cache

   loop from end to front to build table;
*/

let decodeWays = function(str) {
  let callAmount = 0;
  let search = function(str, cache) {
    callAmount++;
    if (cache.hasOwnProperty(str)) cache[str];
    if (str.length < 2) {
      cache[str] = str.length && str !== '0' ? 1 : 0;
      return cache[str];
    } else if (str.length === 2) {
      cache[str] = +str < 27 ? 2 : 1;
      return cache[str];
    }

    let amount = 0;
    for (let i = 1; i <= 2; i++) {
      let num = str.slice(0, i);
      if (+num < 27) {
        amount += search(str.slice(i), cache);
      }
    }

    cache[str] = amount;
    return amount;
  };

  let table = {};
  for (let i = str.length - 1; i >= 0; i--) {
    let smallerProblem = str.slice(i);
    search(smallerProblem, table);
  }
  return table[str];
};
