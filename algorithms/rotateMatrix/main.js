/*
   rotate a matrix in place

   to switch value inplace, ex:
   let a = 87;
   let b = 56;
   b += a // b = 143
   a = b - a // a = 56
   b -= a // b = 87

   to rotate in any direction, you will need three helper functions:
   flipUp, flipLeft, flipDiagonal (downward from top left to bottom right)
   to rotate 90 degrees: flipUp, the flipDiagonal
   the flipping will be done by switch value like above

 */

