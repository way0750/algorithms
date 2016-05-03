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


// ///////////////////////////////////
// hashTable:
// Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};



function HashTable (max) {
  this.storage = [];
  this.max = max;
}

HashTable.prototype.insert = function(key, value) {
  var hashNum = getIndexBelowMaxForKey(key, this.max);
  this.storage[hashNum] = this.storage[hashNum] || new LinkedList();
  var list = this.storage[hashNum];
  var foundEntry = list.search(key);
  if (foundEntry) {
    foundEntry.hashItemValue = value;
  } else {
    list.insertFromEnd(key);
    list.end.hashItemValue = value;
  }
};

HashTable.prototype.retrieve = function(key) {
  var hashNum = getIndexBelowMaxForKey(key, this.max);
  var list = this.storage[hashNum];
  if (list){
    return (list.search(key) || {}).hashItemValue;
  }
};

HashTable.prototype.remove = function(key) {
  var hashNum = getIndexBelowMaxForKey(key, this.max);
  var list = this.storage[hashNum];
  if (list){
    var removedEntry = list.findAndRemove(key);
    if (list.size === 0) {
      delete this.storage[hashNum];
    }
    return removedEntry;
  }
};

var hashTable = new HashTable(10);
hashTable.insert('name', 'way');
hashTable.retrieve('name');
