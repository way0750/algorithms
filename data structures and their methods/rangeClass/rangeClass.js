/**
 * Build a class to represent a range of numbers that takes:
 *   - a beginning index,
 *   - an end index (optional)
 *     If there is no end index, the range should include only the passed-in start value.
 *
 *    that means the range is a inclusive range;
 * 
 *   - a 'step' (optional)
 *     The step is the interval at which elements are included.
 *     For instance, a step of 1 includes every element in the range,
 *     while a step of 2 includes every other element.
 *
 * The range should have a constructor that accepts these arguments in that order.
 *
 * It should also support the following utility functions:
 *   - size(): return the number of items represented by the range
 *   - each(callback(index)): iterate over the range, passing each value to a callback function
 *   - includes(index): return whether or not the range includes the passed value
 *
 * You should also be aware of the following caveats:
 *   - You should allow a negative value for 'step' to count backwards.
 *   - If no step is provided, it should default to 1.
 *   - If the start value is greater than the end value, assume we're counting backwards.
 *   - Should return null if we are given no 'start' value.
 *
 * Range should use constant space, even during the `each` method. i.e. you should *not*
 * use an Array as backing storage. Any given range could potentially be thousands of numbers long,
 * so find a way to represent the range without actually storing each element.
 *
 * USAGE EXAMPLES:
 * var myRange = new Range(0,10); // a new range representing the numbers between 0 and 10 (inclusively)
 *
 * var evenNumbers = new Range(2,8,2); // A range with the even numbers 2, 4, 6, and 8.
 * evenNumbers.each(function(val){
 *   console.log(val+"!");
 * });
 * console.log("Who do we appreciate!?");
 *
 * evenNumbers.size() should be 4
 * evenNumbers.includes(2) should be true, evenNumbers.includes(3) should be false
 */


//inclusive range, from starting element all the way to very last one (if the step includes it)
//can create reverse range too
//You should allow a negative value for 'step' to count backwards.
//  start: 0, end: 100 step: -1
//  100, 99, 98?
//  
//  1, 100 
//  100, 1
//    step: 2
//  abs: 99
//  99/2: floor: 49
//  for size: get abs of both start and end, get the difference then Math.floor(difference/2)
//  what is there is only start and no end? set size to 1

function Range (start, end, step) {
  if (start === undefined) {
    return null;
  } else {
    this.start = start;
  }
  this.end = arguments[1] === undefined ? start : end;
  this.step = arguments[2] === undefined ? 1 : step;
  if (arguments[1] === undefined || arguments[1] === null) {
    this.length = 1;
  } else {
    let max = Math.max(this.start, this.end);
    let min = Math.min(this.start, this.end);
    this.length = Math.floor((max-min)/this.step) + 1;
  }

}


Range.prototype.size = function() {
  return this.length;
};

Range.prototype.include = function(target) {
  //within range?
  if (target < this.start || target > this.end) {
    return false;
  }
  //within step?
  return (target-this.start)%this.step === 0;

};

Range.prototype.each = function(callback) {
  let rounds = this.size();
  let member = this.start;
  while (rounds--){
    callback(member);
    member += (this.start > this.end ? -this.step : this.step);
  }
};

var range = new Range(-12, -42, 3);
range.each((v)=>{
  console.log(v);
});
