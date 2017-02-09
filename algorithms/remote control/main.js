/*
   arrange A-Z into a table with a max width of 5 letters per row
   IE:
   A B C D E
   F G H I J
   K L M N O
   P Q R S T
   U V W X Y
   Z

   given a string of only A-Z letter(s) generate movements
   from default starting position at A to each letter
   ex: if input is GYC
   then output should be:
   D!R!DDD!RRR!UUUU!LL!
*/

/*
   map each letter to a number, this way you can tell the matrix position
   between numbers:
     for x: number % 5 || 5
     for y: ceil number/5

   compare the starting and ending positions
   set XDirection and YDirection
   if starting x is larger than ending x then
   set XDirection to 'U' for going up else to 'D'
       starting x can also be same ending x but we will deal with it later
   do the same for the YDirection
     set YDirection to 'L' for going L and R for going Right

   set XMovements and YMovements
     which is simple XDirection.repeat at absolute value of
     (starting.x - ending.x)
   put x and y movements together and sepearte by !

   should make helpers functions for making movements for 2 letters
   function for getting a letter's matrix position
*/



let getMatrixPos = (letter) => {
  let letterNum = letter.charCodeAt() - 64;
  return {
    x: letterNum % 5 || 5,
    y: Math.ceil(letterNum / 5),
  };
}

let getMovement = (letter1, letter2) => {
  let startPos = getMatrixPos(letter1);
  let endPos = getMatrixPos(letter2);

  let XDirection = startPos.x > endPos.x ? 'L' : 'R';
  let YDirection = startPos.y > endPos.y ? 'U' : 'D';

  let XMovement = XDirection.repeat(Math.abs(startPos.x - endPos.x));
  XMovement = XMovement ? XMovement + '!': '';
  let YMovement = YDirection.repeat(Math.abs(startPos.y - endPos.y));
  YMovement = YMovement ? YMovement + '!' : '';

  return letter1 === 'Z' ? YMovement + XMovement : XMovement + YMovement;
};

let getMovements = (str) => {
  // adding A to the str as the starting pos
  // set movements to empty string
  // then loop through each letter
  // invoke getMovement on each letter
  // concat the return to movements

  // use 'A' as starting position
  str = 'A' + str;
  let movements = '';
  for (let i = 0; i <= str.length - 2; i++) {
    movements += getMovement(str[i], str[i+1]);
  }
  return movements;
}

