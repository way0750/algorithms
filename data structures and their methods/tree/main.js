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
