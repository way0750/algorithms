/* make binary trees: binary, search, heaps(max and min)
 * methods: traversals: in pre post
 * depth and breath first
 * even balancing and check how unbalance the tree is*/
function BinarySearchTree(value) {
  this.leftChild = null;
  this.rightChild = null;
  this.value = value;
}

BinarySearchTree.prototype.insert = function(value) {
  // if value is the same then put the left
  if (value <= this.value) {
    if (this.leftChild) {
      this.leftChild.insert(value);
    } else {
      this.leftChild = new BinarySearchTree(value);
    }
  } else {
    if (this.rightChild) {
      this.rightChild.insert(value);
    } else {
      this.rightChild = new BinarySearchTree(value);
    }
  }
};

BinarySearchTree.prototype.inOrder = function(callBack) {
  callBack = callBack || function() {};
  if (this.leftChild) this.leftChild.inOrder(callBack);
  callBack(this);
  if(this.rightChild) this.rightChild.inOrder(callBack)
};

BinarySearchTree.prototype.preOrder = function(callBack) {
  callBack = callBack || function() {};
  callBack(this);
  if (this.leftChild) this.leftChild.preOrder(callBack);
  if (this.rightChild) this.rightChild.preOrder(callBack);
};

BinarySearchTree.prototype.postOrder = function(callBack) {
  // kids first then parent
  callBack = callBack || function() {};
  if (this.leftChild) this.leftChild.postOrder(callBack);
  if (this.rightChild) this.rightChild.postOrder(callBack);
  callBack(this);
};


/* time and space
 * if N is the total amount of node
 * then time would be N
 * and space would be log N*/

BinarySearchTree.prototype.depthFirstSearch = function(value) {
  if (this.value === value) return true;
  if (this.leftChild && this.leftChild.depthFirstSearch(value)) {
    return true;
  }
  if (this.rightChild && this.rightChild.depthFirstSearch(value)) {
    return true;
  }
  return false;
}


/*
   time and space:
   if N means the total amount of nodes in the tree
   then time is N
   space worse is 2 ^ log(n)
*/

BinarySearchTree.prototype.breathFirstSearch = function(value) {
  // invariant in this case
  // stack = [], this contains trees nodes in order of level
  let stack = [this];
  while(stack.length) {
    let currentTree = stack.shift();
    if (currentTree.value === value) return true;
    if(currentTree.leftChild) stack.push(currentTree.leftChild);
    if(currentTree.rightChild) stack.push(currentTree.rightChild);
  }
  return false;
}




function MinMaxHeap(isMinHeap) {
  // use this to determine the nature of many operations
  this.isMinHeap = isMinHeap;
  this.storage = [];
}

MinMaxHeap.prototype.parentKidOrdered = function(parentIndex, kidIndex) {
  if (!this.storage.hasOwnProperty(parentIndex)
   || !this.storage.hasOwnProperty(kidIndex)) {
    return true;
  }
  let parent = this.storage[parentIndex];
  let kid = this.storage[kidIndex];
  return this.isMinHeap ? parent <= kid : parent >= kid;
};

MinMaxHeap.prototype.getParentIndex = function(curentIndex) {
  return {
    parent: Math.max(Math.floor((curentIndex - 1) / 2), 0)
  };
};

MinMaxHeap.prototype.getKidsIndexes = function(currentIndex) {
  return {
    leftChild: currentIndex * 2 + 1,
    rightChild: currentIndex * 2 + 2,
  };
};

MinMaxHeap.prototype.insert = function(value) {
  // always insert from the end of the storege
  // because min/max heap are the complete binary trees
  // inserting from the end can help to preserve that feature
  // insert from end then swap with parent if have to
  this.storage.push(value);
  let kidIndex = this.storage.length - 1;
  let parentIndex = this.getParentIndex(kidIndex).parent;

  while (!this.parentKidOrdered(parentIndex, kidIndex)) {
    let temp = this.storage[kidIndex];
    this.storage[kidIndex] = this.storage[parentIndex];
    this.storage[parentIndex] = temp;
    kidIndex = parentIndex;
    parentIndex = this.getParentIndex(kidIndex).parent;
  }
  return this.storage.length;
}

MinMaxHeap.prototype.peek = function() {
  return this.storage[0];
}

MinMaxHeap.prototype.remove = function() {
  // swap head with the last element, then pop
  // doing so to preserve the "complete" level feature of heap
  // then bubble down the head
  let returnVal = this.storage[0];
  this.storage[0] = this.storage[this.storage.length - 1];
  this.storage.pop();
  let parentIndex = 0;
  let {leftChild, rightChild} = this.getKidsIndexes(0);

  while (!this.parentKidOrdered(parentIndex, leftChild)
      || !this.parentKidOrdered(parentIndex, rightChild)) {
    let swapIndex;
    if (this.isMinHeap) {
      swapIndex = this.storage[leftChild] < this.storage[rightChild]
                ? leftChild
                : rightChild;
    } else {
      swapIndex = this.storage[leftChild] > this.storage[rightChild]
                ? leftChild
                : rightChild;
    }
    let temp = this.storage[parentIndex];
    this.storage[parentIndex] = this.storage[swapIndex];
    this.storage[swapIndex] = temp;
    parentIndex = swapIndex;
    let newKidIndexes = this.getKidsIndexes(parentIndex);
    leftChild = newKidIndexes.leftChild;
    rightChild = newKidIndexes.rightChild;
  }

  return returnVal;
}


// Tries
/*
   methods, input a string check and see if it is found
   insert a word
   remove a word
*/

function Tries(char = '') {
  this.char = char;
  this.children = {};
}

/*
  basecase: input string is ''
    if '' is found as current node child, return
    else make key '' and add as child to current node
  how to make problem smaller:
    is the first character of the input string found as child in current
    node?
   yes: and call that node with input string slice at 1
   no, make node and then call
  what to return: true
  what to do about return, return true;
*/

Tries.prototype.insert = function (word = '') {
  let char = word.slice(0, 1);
  this.children[char] = this.children[char] || new Tries(char);

  let child = this.children[char]
  return word === '' ? true : child.insert(word.slice(1));
};
// time and space: time length of the word, space: length^2

Tries.prototype.searchWord = function(word = '') {
  let char = word.slice(0, 1);
  let child = this.children[char];
  if (!child) return false;

  if(child && word === '') return true
  return child.searchWord(word.slice(1));
};
// time and space: time length of the word, space: length^2

Tries.prototype.removeWord = function(word) {
  // if found then remove the '' key
  // if not then no need to do anything
  let char = word.slice(0, 1);
  let child = this.children[char];

  if (this.char === '' && word === '') {
    return true;
  } else if (!child) {
    return false;
  } else {
    let pathFound = child.removeWord(word.slice(1));
    let shouldDeleteChild = !Object.keys(child.children).length;
    if (pathFound && shouldDeleteChild) {
      delete this.children[char];
    }
    return pathFound;
  }
};

/*
  time and space:
   time: N as the length of the word
   space: N ^ 2 since we are slicing the string one char at the time
*/

/*
   Graph
   use node list
   use node class as well as graph class in case need to save
   a lot of data in the node

   save all the connected nodes for each node?
   when going through all the nodes then how do you do that?
   also have a comprehensive list of all nodes?
   [
   0: node[4,5,6]
   4: node[0]
   5: node[0,6]
   6: node[0,5]
   ]
   so all the traversal methods are on the nodes?
   and there will similar ones on the graph class but they are more
   of wrappers?
*/

class Node {
  constructor(ID, value) {
    this.ID = ID;
    this.value = value;
    this.edges = {};
  }
  edgeKeysToArray() {
    return Object.keys(this.edges).map((id) => +id);
  }
}

class Graph {
  constructor() {
    this.children = {};
    this.nextID = 0;
  }

  insert(value, undirected, edges=[]) {
    let ID = this.nextID++;
    let node = new Node(ID, value);
    this.children[ID] = node;
    this.connect(ID, undirected, edges);
    return ID;
  }

  connect(nodeID, undirected, edges=[]) {
    nodeID = nodeID instanceof Node ? nodeID.ID : nodeID;
    let targetNode = this.children[nodeID];
    if(!targetNode) return false;

    edges.forEach((nodeID) => {
      targetNode.edges[nodeID] = true;
    });

    if (undirected) {
      // go through each node and add this targetNode
      edges.forEach((ID) => {
        if(this.children[ID]) {
          this.children[ID].edges[ nodeID ] = true;
        }
      });
    }
  }

  remove(targetID) {
    // go through each node and delete id as key
    let node = this.getNode(targetID);
    delete this.children[targetID];
    Object.keys(node.edges).forEach((id) => {
      let node = this.getNode(id);
      delete node.edges[targetID];
    });
  }

  getNode(nodeID) {
    return this.children[nodeID];
  }

  keysToArray() {
    return Object.keys(this.children).map((id) => +id);
  }

  unMarkAfterSearch() {
    this.keysToArray().forEach((id) => {
      this.getNode(id).searched = false;
      this.getNode(id).added = false;
    });
  }

  depthFirstSearch(value) {
    // go through all nodes on graph level
    // mark each node as searched
    // then for each node, do depth first seach
    let search = function(node, value) {
      if (node.value === value) return true;
      node.searched = true;
      // go through all edges;
      let edgeIDs = Object.keys(node.edges);
      for (let i = 0; i < edgeIDs; i++) {
        let node = this.getNode(edgeIDs[i]);
        if (node && !node.searched && search(node, value)) {
          return true;
        }
      }
      return false;
    };

    let allIDs = this.keysToArray();
    let found = allIDs.some((id) => {
      let node = this.getNode(id);
      if(!node.searched && search(node, value)) return true;
    });

    this.unMarkAfterSearch();
    return found;
  }

  breadthFirstSearch(value) {
    /* start with one node, then check for value
     * if not found then
       set searched to true and add all edges that has yet been searched
     */
    let allIDs = this.keysToArray();
    let found = allIDs.some((id) => {
      let node = this.getNode(id);

      if (node.searched) return false;

      let stack = [node];
      while(stack.length) {
        let node = stack.shift();

        if (node.value === value) return true;

        node.searched = true;

        let edgeNodes = node.edgeKeysToArray().reduce((nodes, id) => {
          let edgeNode = this.getNode(id);
          if (!edgeNode.searched && !edgeNode.added) {
            edgeNode.added = true;
            nodes.push(edgeNode);
          }
          return nodes;
        }, []);

        stack = stack.concat(edgeNodes);
      }
    });

    this.unMarkAfterSearch();
    return found;
  }

  breadthFirstSearch2Nodes(node1, node2) {
    node1 = node1 instanceof Node ? node1 : this.getNode(node1);
    node2 = node2 instanceof Node ? node2 : this.getNode(node2);

    let search = (node1, node2) => {
      let stack = [node1];
      while(stack.length) {
        let node = stack.shift();
        if (node === node2) return true;
        node.searched = true;
        let edgeNodes = node.edgeKeysToArray(this)
          .reduce((nodes, id) => {
            let node = this.getNode(id) || { searched: true };
            return node.searched ? nodes : nodes.concat(node);
          });
        stack = stack.concat(edgeNodes);
      }
      return false;
    };

    let found = search(node1, node2) ? true : search(node2, node1);
    this.unMarkAfterSearch();
    return found;
  }

  depthFirstSearch2Nodes(node1, node2) {
    node1 = node1 instanceof Node ? node1 : this.getNode(node1);
    node2 = node2 instanceof Node ? node2 : this.getNode(node2);
    // in case some edges are directed, should search nodes
    // and if not found then search the second now
    // so make a helper function
    let search = (node1, node2) => {
      if (node1 === node2) return true;
      node1.searched = true;
      let kids = node1.edgeKeysToArray()
        .reduce((nodes, id) => {
          let node = this.getNode(id) || { searched: true };
          return node.searched ?  nodes : nodes.concat(node);
        }, []);

      if (kids.length) {
        return kids.some((node1) => {
          return search(node1, node2);
        });
      } else {
        return false;
      }
    }

    let found = search(node1, node2) ? true : search(node2, node1);
    this.unMarkAfterSearch();
    return found;
  }

  biDirectionBreadthSearch(node1, node2) {
    node1 = node1 instanceof Node ? node1 : this.getNode(node1);
    node2 = node2 instanceof Node ? node2 : this.getNode(node2);
    let [stack1, stack2] = [[node1], [node2]];

    let search = (stack, targetID, sourceID) => {
      if (!stack.length) return [];
      let node = stack.shift();
      if (node.searched === targetID) {
        return true;
      }

      node.searched = sourceID;
      let kids = node.edgeKeysToArray()
        .reduce((nodes, nodeID) => {
          let node = this.getNode(nodeID);
          if (node.searched !== sourceID) nodes.push(node);
          return nodes;
        }, []);

      return kids;
    };

    let found = false;
    while (!found && (stack1.length || stack2.length)) {
      let searchStack1 = search(stack1, 'node2', 'node1');
      if (Array.isArray(searchStack1)) {
        stack1 = stack1.concat(searchStack1);
      } else if (searchStack1 === true){
        found = true;
      }

      if (!found) {
        let searchStack2 = search(stack2, 'node1', 'node2');
        if (Array.isArray(searchStack2)) {
          stack2 = stack2.concat(searchStack2);
        } else if (searchStack2 === true){
          found = true;
        }
      }
    }

    this.unMarkAfterSearch();
    return found;
  }
}

/*
   time and space complexity
   time: given one node, then if going 1 direction
     then: for each node you get k nodes and lets say there are
     d nodes to reach the target node then: k^d is the time
     but if we are going bi direction then we get 2 * k^(d/2)
   space: 2 * k^(d/2);
*/


/*
   Given a sorted (increasing order) array with unique integer elements,
   write an algorithm to create a binary search tree with minimal height.

   basically don't turn it into a linked list
   always pick the middle node and make a tree with it
   so divide the array into three parts: left mid right
   make tree with mid, then recursively add left and right

   give an sort array of unique #s
   how to make problem smaller: divide array into 3 parts, left mid right
     left and right are the smaller version of the problem
   base case: array is empty
     what to do: return null, this will be used as child for other node
   what to return: either a node or null
   what to do with returns: if return from left array, then add
     the return as left child, do the same for right

   1 : mid index: 0
   2 : mid index: 1
   3 : mid index: 1
   4: mid index: 2

   Math.floor(length/2)

   time and space:
   time: making all of those arrays: n for each leave
   for a total of log N amount
   so n Log n

   space: how many stack exist at the same time?
   log N calls can exist at the same time.

   it will look like a upside down trangle

   more precise one: branch(depth + 1) - 1

   2^(log n + 1) - 1;

*/


let minimalTree = (array) => {
  //base case
  if (!array.length) return null;

  let arrayLength = array.length
  let mid = Math.floor(arrayLength / 2);
  let leftArray = array.slice(0, mid);
  let rightArray = array.slice(mid + 1);

  let parentNode = new BinarySearchTree(array[mid]);
  parentNode.leftChild = minimalTree(leftArray);
  parentNode.rightChild = minimalTree(rightArray);

  return parentNode;
};
