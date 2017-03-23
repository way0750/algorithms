/*

A message containing letters from A-Z is being encoded to numbers using the following mapping:

'A' -> 1
'B' -> 2
...
  'Z' -> 26
Given an encoded message containing digits, determine the total number of ways to decode it.

  For example,
  Given encoded message "12", it could be decoded as "AB" (1 2) or "L" (12).

    The number of ways decoding "12" is 2.

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
   then try 23 to see if anything found if not then make new key for 2, 3, and 23

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
*/
