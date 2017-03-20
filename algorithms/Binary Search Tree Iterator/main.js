/*
Implement an iterator over a binary search tree (BST). Your iterator will be
   initialized with the root node of a BST.

  Calling next() will return the next smallest number in the BST.

    Note: next() and hasNext() should run in average O(1) time and uses O(h)
   memory, where h is the height of the tree.

   so basically this is a depth first in order search with a stack
   the way to do it:
     set a stack with the top node, then set its self as current node
     as long as current node isn't null, keep on pushing self
       and set current node to its left child

     now whenever current node is null, pop stack use that node, then set
       current node to the popped node's right child

   when the iterator is initialized make stack with the top node
   for the next() function:
   every time it is invoked, run a while loop to add all left nodes of current nodes
     until running into null
     then pop stack as it as returnNode
     and set current node to right node
*/

let BinarySearchTreeIterator = function(tree) {
  let currentNode = tree;
  let stack = [];
  let next = function() {
    while (currentNode) {
      stack.push(currentNode);
      currentNode = currentNode.left;
    }

    // now the currentNode is null
    let returnNode = stack.pop() || { value: 'done' };
    currentNode = returnNode.right;
    return returnNode;
  }

  return {
    next
  };
}
