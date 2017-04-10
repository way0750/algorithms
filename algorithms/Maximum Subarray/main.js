/*
   Find the contiguous subarray within an array (containing at least one number)
   which has the largest sum.

   For example, given the array [-2,1,-3,4,-1,2,1,-5,4],
   the contiguous subarray [4,-1,2,1] has the largest sum = 6.

   a,b,c,d,e
   make all patterns and get the max:
   ''
   a
   ab
   abc
   abcd
   abcde
   then
    ''
    b
    bc
    bcd
    bcde
   then
     ''
     c
     cd
     cde
   then
      ''
      d
      de
   then
       ''
       e

   but this is too inefficient
   and there is a lot of re calculating
   ex:
   a
   ab recalculating for b because this can be seem as a + b
   abc recalculating for bc because this can be seem as a + bc
   abcd, etc...
   abcde

   we can see generating all patterns as:
   a + all the sub patterns which are b + all its sub patterns

   dynamic programming here:
   if we go from end to from e to a
   we can create a lot of reusable patterns to save time

   abcde
   e: '', e
   d: '', d, d + e(cache)
   c: '', c, c + d(cache), c + de(cache)
   b: '', b, b + c(cache), b + cd(cache), b+cde(cache);
   a: '', a, a + b(cache), a + bc(cache), a + bcd(cache), a + bcde(cache);

   set maxSum to -Infinity
   set lastRecord to {}
   loop from end to front
     newRecord to {};
     for each char generate all patterns by self + sub patterns
     make sub patterns by concat '', then next char, then next char...
     but if there is already result in lastRecord, use it
     and for each sub pattern, sum it with cur char, and reassing to maxSum
       if larger
       and add to newRecord[curNum + sub pattern] = sum
     when done, set lastRecord to newRecord, since only the current record is
     useful for the next iteration

   return maxSum;
*/
