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
      return true;
    } else {
      curNode = curNode.next;
    }
  }
  return false;
};



// test case:
var list = new LinkedList();
list.insertFromEnd(1);
list.insertFromEnd(2);
list.insertFromEnd(3);
list.insertFromEnd(4);

list.removeFromHead();
list.search(2); //true
