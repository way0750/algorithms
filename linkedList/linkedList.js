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

