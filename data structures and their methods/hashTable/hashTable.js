/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

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
  this.utilization = 0;
  this.resizing = false;
}

HashTable.prototype.insert = function(key, value) {
  var hashNum = getIndexBelowMaxForKey(key, this.max);
  this.storage[hashNum] = this.storage[hashNum] || new LinkedList();
  if (!this.storage[hashNum]) {
    this.storage[hashNum] = new LinkedList();
  }
  var list = this.storage[hashNum];
  var foundEntry = list.search(key);
  if (foundEntry) {
    foundEntry.hashItemValue = value;
  } else {
    list.insertFromEnd(key);
    list.end.hashItemValue = value;
    this.utilization++;
  }
  var utilizationRate = this.utilization / this.max;
  var shouldResize = utilizationRate >= 0.75 || utilizationRate <= 0.25;
  if (shouldResize && this.resizing === false) {
    this.resizing = true;
    this.resize();
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
  var removedEntry;
  if (list){
    removedEntry = list.findAndRemove(key);
    if (removedEntry) {
      this.utilization--;
    }
    if (list.size === 0) {
      delete this.storage[hashNum];
    }
  }

  var utilizationRate = this.utilization / this.max;
  var shouldResize = utilizationRate >= 0.75 || utilizationRate <= 0.25;
  if (shouldResize && this.resizing === false) {
    this.resizing = true;
    this.resize();
  }
  return removedEntry;
};


//resize
//when utilization rate is under 25% halve
//when is over 75% double
// in the middle resizing you will hit below 25%!

HashTable.prototype.resize = function() {
  //get the old storage
  //set new storage 
  //set this.resizing = true;
  //then go through each key-value and insert them on to this
  console.log('resizing......, curMax:', this.max);
  var oldStorage = this.storage;
  this.storage = [];
  var utilizationRate = this.utilization / this.max;
  this.max = utilizationRate >= 0.75 ? this.max * 2 : Math.floor(this.max /2);

  oldStorage.forEach( (list) => {
    if (list instanceof LinkedList) {
      //go through all the list node and 
      list.each( (node) => {
        var key = node.value;
        var value = node.hashItemValue;
        this.insert(key, value);
      });
    }
  });
  console.log(this.max);
  this.resizing = false;
};

var hashTable = new HashTable(5);
hashTable.insert('name', 'way');
hashTable.retrieve('name');
hashTable.insert('name002', 'way');
hashTable.insert('name002', 'way');
