/**
 * Write a stack using your preferred instantiation pattern. 
 * Avoid using native array methods i.e., push, pop, and length.
 * Once you're done, implement a queue using two stacks.
 */


var Stack = function () {
  this.size = 0;
  this.stack = {};
};

Stack.prototype.push = function(val) {
  this.stack[this.size++] = val;
  return this.size;
};

Stack.prototype.pop = function() {
  if (this.size){
    --this.size;
    let val = this.stack[this.size];
    delete this.stack[this.size];
    return val;
  }
};

let Queue = function () {
  this.stack1 = new Stack();
  this.stack2 = new Stack();
  this.size = 0;
};

Queue.prototype.push = function(val) {
  this.size++;
  this.stack1.push(val);
  return this.size;
};

Queue.prototype.shift = function() {
  if (this.size > 0) {
    if (this.stack2.size === 0) {
      while (this.stack1.size) {
        this.stack2.push(this.stack1.pop());
      }
    }
    this.size--;
    return this.stack2.pop();
  }
};

let q = new Queue();
q.push(1);
q.push(3);
q.push(4);
q.push(5);

