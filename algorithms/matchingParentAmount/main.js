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
*/
