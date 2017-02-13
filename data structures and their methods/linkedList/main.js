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
  } else if (this.end === undefined || this.end === null ) {
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
  let curNode = this.head;
  let index = 0;
  while(curNode) {
    callBack(curNode, index++);
    curNode = curNode.next;
  }
};

LinkedList.prototype.toArray = function() {
  let finalArray = [];
  let currentNode = this.head;
  while(currentNode) {
    finalArray.push(currentNode.value);
    currentNode = currentNode.next;
  }
  return finalArray;
}

LinkedList.prototype.removeDup = function(){
  let dupRecord = {};
  let newList = new LinkedList();
  let currentNode = this.head;
  this.each((node) => {
    if(!dupRecord[node.value]) {
      newList.insertFromEnd(node.value);
      dupRecord[node.value] = true;
    }
  })
  return newList;
};

LinkedList.prototype.slice = function(start = 0, end = Infinity) {
  let newList = new LinkedList();
  this.each((node, index) => {
    if (index >= start && index < end) {
      newList.insertFromEnd(node.value);
    }
  })
  return newList;
};

LinkedList.prototype.KthToLastOriginal = function(Kth) {
  let foundNode = null;
  let findKth = (node) => {
    if (node === null) {
      return 0;
    }
    let currentRank = findKth(node.next) + 1;
    if (currentRank === Kth) {
      foundNode = node;
    }
    return currentRank;
  }
  findKth(this.head);
  return foundNode;
}

LinkedList.prototype.KthToLast = function(Kth) {
  let stack = [];
  this.each((node) => {
    stack.unshift(node);
  })
  for (let i = 0 ; i < stack.length; i++) {
    if (i === Kth - 1) return stack[i];
  }
  return null;
};
