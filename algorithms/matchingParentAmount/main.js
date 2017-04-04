/*
   given a string consisted of only "(" ")"
   out put the index where you can slice it into two sub string
   fulfilling the following conditions:
   left sub string has the same amount of "(" as ")" in the right sub str

   ex:
     input '((((()()(())'
     output 4 because if you slice 0 to 4, and 4 to end
     you will end up with these two sub strings:
   (((( has 4 (
   ()()(()) has 4 )


   solution:
   set lastIndexOfMatchingAmount to -1;
   set a while loop with condition that left pointer is smaller than right one
     for each loop
       keep two pointers: one points at a ( from the left, one points at a )
       in the loop move each point in their own while until finding the next
         respective ( or  )
         if found set lastIndexOfMatchingAmount to left index;

   return lastIndexOfMatchingAmount > -1 ? lastIndexOfMatchingAmount + 1 : -1;
*/



