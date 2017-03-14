/*
Given a binary tree and a sum, find all root-to-leaf paths where each path's
   sum equals the given sum.

For example:
Given the below binary tree and sum = 22,
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \    / \
        7    2  5   1

return
[
   [5,4,11,2],
   [5,8,4,5]
]
   using recursion: passing next node partial sum and partial path to next stack
   when node is null, check partial sum, if same then return [partial path]

   base case: current node is null, check partial sum
     if partial sum is the same then [partial path];
     else []
   how to make problem smaller: pass an [n,n,n,n,self];
   what to return always: an array of arrays
   what to do with returns: just return it

   time and space complexity
     time
       n for the amount of nodes
       + amount of paths
     space: depth + amounts path * depth === (1 + amounts of path) * depth
     amounts of path
*/

let pathSum = function(tree, target, paths = [], partialPath = [], partialSum = 0) {
  partialPath.push(tree.value);
  partialSum += tree.value;

  if (!tree.left && !tree.right && partialSum === target) {
    paths.push(partialPath.slice());
  }
  if (tree.left) {
    pathSum(tree.left, target, paths, partialPath, partialSum);
  }
  if (tree.right) {
    pathSum(tree.right, target, paths, partialPath, partialSum);
  }

  partialPath.pop();
  return paths;
};

it('does it work', function(){
   let node7 = {value: 7};
   let node2 = {value: 2};
   let node11 = {value: 11, left: node7, right: node2};
   let node4 = {value: 4, left: node11};
   let node5 = {value: 5};
   let node1 = {value: 1};
   let node4Second = {value: 4, left: node5, right: node1};
   let node13 = {value: 13};
   let node8 = {value: 8, left: node13, right: node4Second};
   let root = {value: 5, left: node4, right: node8};
   pathSum(root, 22).should.deep.equal([[5,4,11,2],[5,8,4,5]]);
});
