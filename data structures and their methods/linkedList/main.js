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
  var newNode = value instanceof LinkedListNode
              ? value
              : new LinkedListNode(value);
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

/*
  given a targetNode, find it and delete it
  but if the targetNode is either head of end, then don't do anything
  no need to return anything
  do it in constant time

   time and space are constant
*/
LinkedList.prototype.deleteMiddle = function(targetNode) {
  if (targetNode === this.head || targetNode === this.end) return;
  let nextNode = targetNode.next;
  targetNode.value = nextNode.value;
  targetNode.next = nextNode.next;
  // "deleting" the node by dereferencing it
  nextNode.next = null;
}

LinkedList.prototype.partition = function(value) {
  if (value === null || value === undefined) return;
  let swapNode = this.head;
  let currentNode = this.head;
  while(currentNode) {
    if (currentNode.value < value) {
      let swapNodeValue = swapNode.value;
      swapNode.value = currentNode.value;
      currentNode.value = swapNodeValue;
      swapNode = swapNode.next;
    }
    currentNode = currentNode.next
  }
};





/*
   You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the 1's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list.
*/

let addLinkedListNumsWorking = (l1, l2) => {
  let finalNum = new LinkedList();
  let carryOver = 0;
  let leftNum = l1.head;
  let rightNum = l2.head;
  while(leftNum || rightNum) {
    let sum = (leftNum ? leftNum.value : 0)
            + (rightNum ? rightNum.value : 0);
    finalNum.insertFromEnd((sum % 10) + carryOver);
    carryOver = Math.floor(sum / 10);
    leftNum = leftNum ? leftNum.next : null;
    rightNum = rightNum ? rightNum.next : null;
  }
  if (carryOver) {
    finalNum.insertFromEnd(carryOver);
  }
  return finalNum;
};

/*
   time and space:
   going through both lists at same length of n
   then time is n
   making new list with at most n + 1 length
   so it is n + n + 1 which is 2n + 1 which is n
   space: n + 1 which is n
*/

/*
  do this with resursion
  each call will only add one digit from one list
   and make one node
   then pass next nodes to recursive calls
   then add result to that one new node
   base case: both l1 l2 are null and carryover is 0;
     return new node with value of 1 or nothing
   how to make problem smaller: pass each list.next and the carryover
   what to return always: either node or null
   what to do with return: if node then insertFromEnd, if null then nothing
*/

let addLinkedListNums = (l1, l2) => {
  let sum = (node1, node2, carryOver = 0) => {
    if (node1 === null && node2 === null) {
      return carryOver ? new LinkedListNode(carryOver) : null;
    }
    let backupNode = new LinkedListNode(0);
    node1 = node1 || backupNode;
    node2 = node2 || backupNode;

    let num = node1.value + node2.value + carryOver;
    let digit = new LinkedListNode(num % 10);
    digit.next = sum(node1.next, node2.next, Math.floor(num / 10))
    return digit;
  }
  let newList = new LinkedList();
  newList.insertFromEnd(sum(l1.head, l2.head));
  return newList;
};
