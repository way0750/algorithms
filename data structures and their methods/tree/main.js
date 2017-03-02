/* make binary trees: binary, search, heaps(max and min)
 * methods: traversals: in pre post
 * depth and breath first
 * even balancing and check how unbalance the tree is*/
function BinarySearchTree(value) {
  this.leftChild = null;
  this.rightChild = null;
  this.value = value;
  this.leftAmount = 0;
  this.rightAmount = 0;
  this.totalNodeAmount = 1;
}

BinarySearchTree.prototype.insert = function(value) {
  // if value is the same then put the left
  if (value <= this.value) {
    if (this.leftChild) {
      this.leftChild.insert(value);
    } else {
      this.leftChild = new BinarySearchTree(value);
    }
    this.leftAmount++;
  } else {
    if (this.rightChild) {
      this.rightChild.insert(value);
    } else {
      this.rightChild = new BinarySearchTree(value);
    }
    this.rightAmount++;
  }
  this.totalNodeAmount++;
};

BinarySearchTree.prototype.getRandomNode = function(
  memoID = 0,
  targetID = Math.floor(Math.random() * this.totalNodeAmount)) {
  if (targetID === memoID + this.leftAmount) return this;
  if (targetID < memoID + this.leftAmount) {
    return this.leftChild.getRandomNode(memoID, targetID);
  } else if (targetID > memoID + this.leftAmount) {
    return this.rightChild.getRandomNode(memoID + 1 + this.leftAmount, targetID);
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
    let search = (node, value) => {
      if (node.value === value) return true;
      node.searched = true;
      // go through all edges;
      let edgeIDs = Object.keys(node.edges);
      let searchResult = edgeIDs.some((nodeID) => {
        let node = this.getNode(nodeID);
        if (node && !node.searched && search(node, value)) {
          return true;
        }
      });

      return searchResult;
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


/*
   List of Depths: Given a binary tree, design an algorithm which creates a linked
   list of all the nodes at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).

   so use a stack, do something similar to breadth first search
   except you have to add all nodes from each level from last level

   given a binary tree
   return linked lists of same amount of the depth, and each depth has its own list

   set stack to array with the top most node
   set lists to empty array
   while stack is not empty
   make a linked list with all the nodes in it and put this list to the lists array
   then reassign the stack array to the return of reducing the stack to all of its own
     kids

   return the lists array;
*/

let treeToLeveledLists = (tree) => {
  let stack = [tree];
  let lists = [];

  while (stack.length) {
    let list = stack.reduceRight((list, node) => {
      return { value: node.value, next: list};
    }, null);

    lists.push(list);

    stack = stack.reduce((newStack, node) => {
      if (node.leftChild) newStack.push(node.leftChild);
      if (node.rightChild) newStack.push(node.rightChild);
      return newStack;
    }, []);
  }

  return lists;
};


function breadthFirstSearchFunctional (tree, value) {
  let search = (sameLevelNodes, value) => {
    let searchResult = sameLevelNodes.some((node) => node.value === value);
    if (searchResult) return true;

    sameLevelNodes = sameLevelNodes.reduce((arr, parentNode) => {
      if (parentNode.leftChild) arr.push(parentNode.leftChild);
      if (parentNode.rightChild) arr.push(parentNode.rightChild);
      return arr;
    }, []);

    return  sameLevelNodes.length ? search(sameLevelNodes, value) : false;
  }

  return search([tree], value);
}


/*
   Check Balanced: Implement a function to check if a binary tree is balanced.
   For the purposes of this question, a balanced tree is defined to be a tree
   such that the heights of the two subtrees of any node never differ by more
   than one.

   recursively check the depth of each branch? anytime when there is more than 1
   degree of difference return false
   if there is 1 degree of difference so far, then what? return what to upper stack?
   return the min and max? then compare?
   why?
   to get the global min max depth as a way to tell the unbalance-ness of the entire
   tree;

   but do you have to through the entire tree?
   check one side at the time

   breadth search first?
   firstStop level vs current level is larger than 1 then return false?
   similar to bread first search on a graph, breadth first search can check the
   distance between two nodes faster. In this case it is used for check two nodes
   to see if they are too far apart


   get nodes level by level
   for each level check and see if all nodes have children
   set min to the level number in which there is a node doesn't have all children
   then compare to current level number, if difference is larger than 1 return false;

   set min to null
   set stack to an array with top node
   base case: if stack is empty return true;
   how to make problem smaller: make new stack with children
     if any one node doesn't have both children and min isn't null, then set min
     to current num
   what to return: boolean
   what to do about return: just return it
*/

let checkBalance = function(tree) {
  let search = (parents, min, curStackNum) => {
    if (!parents.length) return true;

    let children = parents.reduce((stack, parent) => {
      if (parent.leftChild) stack.push(parent.leftChild);
      if (parent.rightChild) stack.push(parent.rightChild);
      return stack;
    }, []);

    if (parents.length * 2 !== children.length) min = min || curStackNum;

    return curStackNum - min > 1 ? false : search(children, min, ++curStackNum);
  }

  return search([tree], null, 0);
};


/*
   Implement a function to check if a binary tree is a binary search tree.
   input a binary tree output boolean
   true for tree is binary search tree
   just check and see if  left <= parent <= right
   if anytime that return false, reture false

   recursive function?
   base case: tree is null, return true reach the end without encountering
     anything sub tree that is not in order
   how to make it smaller: pass left and right to recursive function
   what to return always: boolean
   what to do with returns: just return them

   maybe should return as early as possible instead of going all the way down
   the tree and up
   check current level first, then recursively call
 */

let validateBSTWorking = function(tree) {
  if (!tree) return false;

  let leftValue = ( tree.leftChild || { value: -Infinity } ).value;
  let rightValue = ( tree.rightChild || { value: Infinity } ).value;
  if ( !( leftValue <= tree.value && tree.value <= rightValue ) ) return false;

  let leftSubTreeOrdered = !tree.leftChild || validateBST(tree.leftChild);
  let rightSubTreeOrdered = !tree.rightChild || validateBST(tree.rightChild);

  return leftSubTreeOrdered && rightSubTreeOrdered;
};


/* what if:
 * 
 *                   20
 *              10         89
 *                   25

   turn the whole thing into an array and check and see if
   it is sorted
   or get min and max of every single sub tree and see if current node
   is min <= currentNode <= max

   can recursively go all the way down to a leaf then return min max
   recursive case: if left/right node is a node then recursively call
   what to return: { min and max } or false;
   what to do with return: compare min and max to current node value
     if not ordered, return false;
 */


let validateBST = function(tree) {
  if(!tree) return false;

  let search = (tree) => {
    let defaultMinMax = { min: tree.value, max: tree.value };
    let leftMinMax = tree.leftChild ? search(tree.leftChild) : defaultMinMax;
    let rightMinMax = tree.rightChild ? search(tree.rightChild) : defaultMinMax;

    // one side of the tree isn't ordered
    if (!(leftMinMax && rightMinMax)) return false;

    let ordered = leftMinMax.max <= tree.value && tree.value <= rightMinMax.min;

    return ordered ? { min: leftMinMax.min, max: rightMinMax.max } : false;
  };

  return !!search(tree);
};


/* Successor: Write an algorithm to find the "next" node (i.e., in-order successor)
 * of a given node in a binary search tree. You may assume that each node has a
 * link to its parent.

   given a node, find the next inorder node
   what if next node is null? then return parent

   get right kid's furthest left child
   or right kid if right kid has no children
   or parent if right kid si null

   so if right kid exist, do search on right kid
   else compare to parent
     if larger than parent, return null;
     else return parent;

   how to search on right?
   recursively search left child
   base case: left is null, return null
   what to do about return values: return the return if true, else self

   time and space when searching right, you would have to go through the entire
   length of left of the right child
     name rd as right depth
   when searching parent, you would have to go all the way to the first ancestor
   that is a left child of its parent

   ah as ancetorHeight

   so this could be rd or ah
   space same as rd or ah

 */

let successor = function(node) {
  // yes right, return right search;
  // no right, and smaller or equal to parent return parent;
  // default return null;
  let searchRight = (node) => {
    return node.leftChild ? searchRight(node.leftChild) : node;
  };

  let searchParent = (node) => {
    if ((node.parent || {}).rightChild === node) {
      return searchParent(node.parent);
    } else {
      return node.parent;
    }
  };

  if (node.rightChild) {
    return searchRight(node.rightChild);
  } else if (node.value <= node.parent.value) {
    return searchParent(node);
  }
};

let closestAncestor = function(tree, node1, node2){
  let isOneOfTheNodes = (node) => node === node1 || node === node2;
  let ancestor = null;

  let search = (currentNode, neededAmount) => {
    if (!neededAmount || !currentNode) return neededAmount;
    let stillNeedAmount = neededAmount;
    if (isOneOfTheNodes(currentNode)) --stillNeedAmount;

    if (!stillNeedAmount) {
      return stillNeedAmount;
    } else {
      stillNeedAmount = search(currentNode.leftChild, stillNeedAmount);

    }

  };

  search(tree, 2);
  return ancestor;
};



/*
    BST Sequences: A binary search tree was created by traversing through an array
   from left to right and inserting each element. Given a binary search tree
   with distinct elements, print all possible arrays that could have led to
   this tree.

       ex:
        2
      1   3
   only two possible permutation can lead to this:
   2 1 3
   2 3 1

   a larger tree can be solved with a smaller one like this
   basically parent left right and parent right left
   but left and right might come with many permutations
   so it is parent -> each one of the left permutations concat with each
   of the right permutations
   then parent -< each one of the right permutations concat with each of the
   left permutations


   this can be done with recursion:

   base case: node is null, return []
   make problem smaller: recursively call on left and right child
   what to do with returns:
     concat each left return with all of right returns
     concat each right return with all of left returns
     make sure to also add current node value to each new permutation
   what to return always: an array which contains possible permutations
*/

/*
   time and space:
   arr1 length * arr2 length * 2 * longest ele in arr1 + arr2 * 2
   l1 * l2 * 2 * (le1 + le2) * 2
*/

let crossConcat = function(arr1, arr2, callBack) {
  callBack = callBack || function(arr) {return arr;};
  let concat = function(source, target) {
    return source.reduce((finalArr, sourceSubArr) => {
      let newConcats = target.map((targetSubArr) => {
        return sourceSubArr.concat(targetSubArr);
      });

      newConcats = newConcats.length ? newConcats : [sourceSubArr];
      newConcats = newConcats.map((permute) => callBack(permute));
      return finalArr.concat(newConcats);
    }, []);
  };

  let leftSide = concat(arr1, arr2);
  let rightSide = concat(arr2, arr1);
  return leftSide.concat(rightSide);
};

let BSTSequences = function(tree) {
  if (!tree) return [];
  let leftPermutes = BSTSequences(tree.leftChild);
  let rightPermutes = BSTSequences(tree.rightChild);
  let sequences = crossConcat(
    leftPermutes,
    rightPermutes,
    (arr) => {
      return [tree.value].concat(arr);
    }
  );
  return sequences.length ? sequences : [[tree.value]];
};


/*
   Check Subtree: Tl and T2 are two very large binary trees, with Tl much bigger
   than T2. Create an algorithm to determine if T2 is a subtree of Tl.
   A tree T2 is a subtree of T1 if there exists a node n in Tl such that the
   subtree of n is identical to T2. That is, if you cut off the tree at node n,
   the two trees would be identical.


   first search the larger tree T1 for a node that is the same value as T2 root
   node
   if found multiple that is fine

   then compare the found node with T2 tree recursively to see if all nodes
   share same value;

   time and space:
   time, searching for node in T1: let t1 to be the size of the T1 tree,
   then it is t1, then go through both trees: let t2 be the size of T2
   then it takes t2 to go through the entrie T2
   total: t1 + t2

   space: if we use depth first search then the first search is going to be
   log t1
   and for comparing two trees:
   log t1 + log t2 * 2
   which log t1 + log t2

   base case for searching: if input tree1 is null then return false;
     or if node found, then call the comparing function, and if it returns true
     then just return true;
   how to make problem smaller: recursively call left and right child;
     if one returns true, then stop recursion;
   what to return always: boolean
   what to do with return: keep returning it


   for comparing:
   make another function: that takes 2 nodes
   base case: current nodes values aren't the same return false;
     or one of the node is null then return node1 value === node2 value
   what to return always: boolean;
   how to make problem smaller: recursively call leftChild
     if return true, rightChild
   what to do with returns, keep returning;
 */

let compareTree = function(t1, t2) {
  if (!t1 || !t2) {
    let defaultNode = { value: 'nothingness' };
    // both or one has reach a leaf node
    t1 = t1 || defaultNode;
    t2 = t2 || defaultNode;
    return t2.value === 'nothingness' ? true : t1.value === t2.value;
  } else if (t1.value === t2.value) {
    return compareTree(t1.leftChild, t2.leftChild) &&
           compareTree(t1.rightChild, t2.rightChild);
  }

  return false;
}

let checkSubtree = function(t1, t2) {
  if (!t1) return false;
  if (t1.value === t2.value && compareTree(t1, t2)) return true;
  // not same value or compare failed
  // check left and then right
  return checkSubtree(t1.leftChild, t2) || checkSubtree(t1.rightChild, t2);
};

/*
   You are given a binary tree in which each node contains an integer value
   (which might be positive or negative). Design an algorithm to count the
   number of paths that sum to a given value. The path does not need to
   start or end at the root or a leaf, but it must go downwards
   (traveling only from parent nodes to child nodes).

   need to create all possible paths
   all possible sum of all possible paths can be done this way once reaching the
   a leaf node
   and for each level, check the new/current array of sums and count the amount
   of sum that are same as the targetSum
          a [a]
        b [b, ab]
      c [c, cb, cba]
    d [d, dc, dcb, dcba]
   e [e, ed, edc, edcb, edcba]

   time and space:
   space: if using recursion, then look at the last depth it has total elements
   same as the depth + 1 and it is depth + 1 down
   and each level has one more element than last, so you can use the fomular to
   calculate trangle to calculate the space complexity for all simutaniuosly
   exisitng stack:
   height: depth + 1 + 1 = depth + 2
   width: depth + 1
   height * width = ((depth + 2) * (dpeth + 1)) / 2
   depth ^ 2 + depth + 2*depth + 2 = depth^2 + depth + depth = depth^2 + 2depth
   = depth^2
   then divide by 2: depth^2/2 which is depth^2 * 1/2 which is depth^2

   time: you will have to go through all n nodes but for each n there can be
   different amoutn of iteractions
   for depth0, there is 1 node and there is only 1 interation so total: 1
   for depth1, there are 2 nodes and each has 2 interation so total: 4
   for depth2, there are 4 nodes and each has 3 interation so total: 12
   it can be expressed as (depth + 1) * 2^(depth)
   and you have to sum all it up
   
   so use sumation to do it

   log n
   _______
   \        (depth + 1) * 2^depth
   /
   -------
   depth = 0

   using recursion to do it:
   base case: tree is null, then return 0 for 0 amount of paths that
     can be summed to targetSum
   making the problem smaller: recursively call on left and right child
   what to return always: a number which represents the amount of paths that can
     be summed to target sum
   what to do about returns: left return + right return + curernt node === sum?
     to get total
*/

