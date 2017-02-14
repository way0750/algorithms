/**
 * Write a stack using your preferred instantiation pattern. 
 * Avoid using native array methods i.e., push, pop, and length.
 * Once you're done, implement a queue using two stacks.
 */


var Stack = function () {
  this.size = 0;
  this.stack = {};
  this.mins = [];
};

Stack.prototype.push = function(val) {
  if (this.mins.length) {
    let currentMin = this.mins[this.mins.length - 1];
    currentMin > val ? this.mins.push(val)
                     : this.mins.push(currentMin);
  } else {
    this.mins.push(val);
  }
  this.stack[this.size++] = val;
  return this.size;
};

Stack.prototype.pop = function() {
  if (this.size){
    this.mins.pop();
    --this.size;
    let val = this.stack[this.size];
    delete this.stack[this.size];
    return val;
  }
};


/*
   How would you design a stack which, in addition to push and pop, has a
   function
   min which returns the minimum element? Push, pop and min should all operate
   in 0(1) time.

   constrain: has to be O(1) so does that mean using more space to save things
   just so you can get access to them fast? Hash?

   as you push or pull save current min in a or array, or linkedList, or hash
   then each time you push new element into the Stack, you compare the new one
   with what is found as the recently saved element in the array, if smaller,
   then add this new element, if not then save the same recently element found
   in the array
   [8,9,7,9,5,8,3,9,3,3,3,8]

   [8,8,7,7,5,5,3,3,3,3,3,3]

   for size from 1 to 2, min is 5
   for size from 3 to 6, min is 4
   [{ 1 to 2 is 5 }, { 3 to 6 is 4 }, {5 to Infinity 2}]
   [8,7,5,3]

   but for time and space
   for worse case, this approch will actuall take more space than the
   "ineffective" one
 */

Stack.prototype.min = function() {
  return this.mins[this.mins.length - 1];
}







let Queue = function () {
  this.inStack = new Stack();
  this.outStack = new Stack();
  this.size = 0;
};

Queue.prototype.push = function(val) {
  this.size++;
  this.inStack.push(val);
  return this.size;
};

Queue.prototype.shift = function() {
  if (this.size > 0) {
    if (this.outStack.size === 0) {
      while (this.inStack.size) {
        this.outStack.push(this.inStack.pop());
      }
    }
    this.size--;
    return this.outStack.pop();
  }
};



