/*
 * Assignment: Write a function that returns true if a linked list contains a cycle, or false if it terminates somewhere
 *
 * Explanation:
 * 
 * Generally, we assume that a linked list will terminate in a null next pointer, as follows:
 *
 * A -> B -> C -> D -> E -> null
 *
 * A 'cycle' in a linked list is when traversing the list would result in visiting the same nodes over and over
 * This is caused by pointing a node in the list to another node that already appeared earlier in the list. Example:
 *
 * A -> B -> C
 *      ^    |
 *      |    v
 *      E <- D
 *
 * Example code:
 *
 * var nodeA = Node('A');
 * var nodeB = nodeA.next = Node('B');
 * var nodeC = nodeB.next = Node('C');
 * var nodeD = nodeC.next = Node('D');
 * var nodeE = nodeD.next = Node('E');
 * hasCycle(nodeA); // => false
 * nodeE.next = nodeB;
 * hasCycle(nodeA); // => true
 *
 * Constraint 1: Do this in linear time
 * Constraint 2: Do this in constant space
 * Constraint 3: Do not mutate the original nodes in any way
 */

var Node = function(value){
  return { value: value, next: null };
};

var hasCycle = function(linkedList){
  var slow = linkedList;
  var fast = linkedList.next;
  while (fast !== null){
    if (fast === slow) {
      return true;
    }
    slow = slow.next;
    fast = fast.next ? fast.next.next : null;
  }
  return false;
};







//second version, this one actually works:
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


var linkList = new LinkedList();
linkList.insertFromEnd(1);
linkList.insertFromEnd(2);
linkList.insertFromEnd(3);
linkList.insertFromEnd(4);
linkList.insertFromEnd(5);
linkList.end.next = linkList.head.next.next;
//check and see if the list is indeed a cycled linkList
// var amount = 15;
// var curNode = linkList.head;
// while (amount--){
//   console.log(curNode.value);
//   curNode = curNode.next;
// }

//set two pointer, one goes through nodes one by one, another one goes two by two
//if any time both pointer points to the same node, then the list had cycle
//if not then no cycle

function hasCycle (list) {
  var slowNode = list.head;
  var fastNode = slowNode ? slowNode.next : null;
  while (fastNode !== null){
    if (slowNode === fastNode) {
      return true;
    } else {
      slowNode = slowNode.next;
      fastNode = fastNode.next ? fastNode.next.next : null;
    }
  }
  return false;
}

hasCycle(linkList); // true
