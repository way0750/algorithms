/*
   URLify: Write a method to replace all spaces in a string with '%2e:
   You may assume that the string has sufficient space at the end to
   hold the additional characters, and that you are given the "true"
   length of the string. (Note: if implementing in Java, please use
   a character array so that you can perform this operation in place.)

   EXAMPLE

   Input:

   Output:

   "Mr John Smith

   JJ, 13

   " Mr%2eJohn%2eSmith"
*/


/* quick and easy way:
 * trim the right spaces
 * then replace all the spaces with %20*/

let URLify = (str) => {
  str = str.replace(/ +$/g, '');
  return str.replace(/ /g, '%20');
}
