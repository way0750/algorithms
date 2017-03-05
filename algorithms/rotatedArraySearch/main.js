/*
 * Given a sorted array that has been rotated some number of items right or
 * left, i.e. [0, 1, 2, 3, 4, 5, 6, 7] might become [4, 5, 6, 7, 0, 1, 2, 3]
 * how can you efficiently find an element? For simplicity, you can assume
 * that there are no duplicate elements in the array.
 *
 * rotatedArraySearch should return the index of the element if it is in the
 * array and should return null otherwise.
 *
 * For instance:
 * rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 2) === 5
 *
 * rotatedArraySearch([4, 5, 6, 0, 1, 2, 3], 100) === null
 *
 *
 * Target time complexity: O(log(array.length)) O(log(n))

   check and see if the array is actually rotated?
   if yes then turn it back to a sorted array?
   that would take n for going throught the array, another n for rotating it
   then log n for binary search
   so 2N + logN

   or logN

   another way:
   straight using binary search
   if found return the index
   if not then do one of the following:
   left side is it sorted and target within it?
     if yes, then search this portion
   right side is it sorted and target within it?
     if yes, then search this portion
   left side is it not sorted?
     if yes, then target might be in there search it
   right side is it not sorted?
     if yes, then target might be in there search it
   else return null;

   

 */

