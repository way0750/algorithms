// linkedList
// need to have pointer pointing to 
// insertToEnd
// insertToHead
// removeFromEnd
// removeFromHead
// size

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
