/*
 * Implement a linked list using the pseudoclassical instantiation pattern.
 *
 * Your linked list should have methods called "addToTail", "removeHead", and "contains."
 *
 */

// EXAMPLE USAGE:
// var list = new LinkedList();
// list.tail;         //yields 'null'
// list.addToTail(4);
// list.addToTail(5);
// list.head.value;   //yields '4';
// list.contains(5);  //yields 'true';
// list.contains(6);  //yields 'false';
// list.removeHead(); //yields '4'
// list.tail.value;   //yields '5';


var LinkedList = function(){
  this.head = null;
  this.tail = null;
};

var Node = function(value){
  this.value = value;
  this.next = null;
};

//write methods here!

LinkedList.prototype.addToTail = function(value){
  var newNode = new Node(value);
  // if (!this.head){
  //   this.head = newNode;
  // } else if (!this.tail){
  //   this.tail = newNode;
  //   this.head.next = newNode;
  // } else {
  // }

  if (!this.tail){
    this.tail = newNode;
  } else if (!this.head){
    this.head = this.tail;
    this.head.next = newNode;
    this.tail = newNode;
  } else {
    this.tail.next = newNode;
    this.tail = newNode;
  }

};

LinkedList.prototype.removeHead = function(){
  if (!this.head){return undefined;}
  var oldHead = this.head.value;
  this.head = this.head.next;
  return oldHead;
};

LinkedList.prototype.contains = function(value){

  var curNode = this.head;
  while(true){
    if (curNode.value === value){
      return true;
    } else if (curNode.next === null){
      return false;
    } else {
      curNode = curNode.next;
    }
  }
};

LinkedList.prototype.makeNode = function(value){
  return new Node(value);
};





/*
 * Implement a linked list using the pseudoclassical instantiation pattern.
 *
 * Your linked list should have methods called "addToTail", "removeHead", and "contains."
 *
 */


function LinkedList () {
  this.head = null;
  this.tail = null;
}

LinkedList.prototype.addToTail = function (value) {
  var node = new Node(value);
  if (this.head === null) {
    this.head = node;
    this.tail = node;
  } else {
    this.tail.next = node;
    this.tail = node;
  }
};

LinkedList.prototype.removeHead = function () {
  var oldHead = this.head;
  if (this.head === this.tail) {
    this.head = null;
    this.tail = null;
  } else {
    this.head = this.head.next;
  }
  return oldHead.value;
};

LinkedList.prototype.contains = function (value) {
  var curNode = this.head;
  while (curNode) {
    if (curNode.value === value) {
      return true;
    }
    curNode = curNode.next;
  }
  return false;
};

function Node (value) {
  this.value = value;
  this.next = null;
}

var list = new LinkedList();
list.tail;         //yields 'null'
list.addToTail(4);
list.addToTail(5);
list.head.value;   //yields '4';
list.contains(5);  //yields 'true';
list.contains(6);  //yields 'false';
list.removeHead(); //yields '4'
list.tail.value;   //yields '5';




// another version:
function LinkedListNode (value) {
  this.value = value;
  this.next = null;
}

function LinkedList () {
  this.head = null;
  this.end = null;
  this.size = 0;
}

LinkedList.prototype.insertFromEnd = function(value) {
  var newNode = new LinkedListNode(value);
  if (this.head === null && this.end === null) {
    this.head = newNode;
    this.end = newNode;
  } else if (this.end === null ) {
    this.end = newNode;
  } else {
    //set old end's next to the newNode, then set newNode as the end
    this.end.next = newNode;
    this.end = newNode;
  }
  return ++this.size;
};

LinkedList.prototype.removeFromHead = function() {
  if (this.head){
    //if the head and the end are the same node, then reset both
    if (this.head === this.end) {
      this.head = null;
      this.end = null;
    } else {
      this.head = this.head.next;
    }
    --this.size;
  }

  return this.size;
};

LinkedList.prototype.search = function(value) {
  var curNode = this.head;
  while (curNode) {
    if (curNode.value === value){
      return curNode;
    } else {
      curNode = curNode.next;
    }
  }
  return null;
};

LinkedList.prototype.findAndRemove = function(value) {
  // it has to have two point just so you can rejoin a broken list
  if (this.head && this.head.value === value){
    var removed = this.head;
    this.removeFromHead();
    return removed;
  } else {
    var firstNode = this.head, secondNode = (this.head || {}).next;
    while (secondNode) {
      if (secondNode.value === value) {
        firstNode.next = secondNode.next;
        secondNode.next = null;
        this.size--;
        if (this.size === 1) {
          this.end = this.head;
        }
        return secondNode;
      } else {
        firstNode = secondNode;
        secondNode = secondNode.next;
      }
    }
  }
  return null;
};


LinkedList.prototype.each = function(callBack) {
  var curNode = this.head;
  while(curNode) {
    callBack(curNode);
    curNode = curNode.next;
  }
};

// test case:
var list = new LinkedList();
list.insertFromEnd(1);
list.insertFromEnd(2);
list.insertFromEnd(3);
list.insertFromEnd(4);
list.insertFromEnd(5);
list.insertFromEnd(6);
list.removeFromHead();
list.search(2); //true
list.findAndRemove(3);
list.findAndRemove(3);
