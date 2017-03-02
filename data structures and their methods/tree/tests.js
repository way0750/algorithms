chai.should();
describe('BinarySearchTree', function() {
  let bsTree;
  beforeEach(function() {
    bsTree = new BinarySearchTree(30);
    bsTree.insert(3);
    bsTree.insert(6);
    bsTree.insert(9);
    bsTree.insert(90);
    bsTree.insert(33);
    bsTree.insert(5);
    bsTree.insert(87);
    bsTree.insert(44);
    bsTree.insert(22);
    bsTree.insert(11);
    bsTree.insert(88);
    bsTree.insert(46);
  });
  it('in order traversal', function() {
    let arr = []
    let result = [3, 5, 6, 9, 11, 22, 30, 33, 44, 46, 87, 88, 90];
    bsTree.inOrder((tree) => {
      arr.push(tree.value)
    });
    arr.should.deep.equal(result)
  });
  it('pre order traversal', function() {
    let arr = [];
    let result = [30, 3, 6, 5, 9, 22, 11, 90, 33, 87, 44, 46, 88];
    bsTree.preOrder((tree) => {
      arr.push(tree.value);
    });
    arr.should.deep.equal(result);
  });
  it('post order traversal, kids first', function() {
    let arr = [];
    let result = [5, 11, 22, 9, 6, 3, 46, 44, 88, 87, 33, 90, 30];
    bsTree.postOrder((tree) => {
      arr.push(tree.value);
    });
    arr.should.deep.equal(result);
  });
  it('depthFirstSearch works', function() {
    bsTree.depthFirstSearch(9).should.be.true;
    bsTree.depthFirstSearch(9999).should.be.false;
  });

  it('breadthFirstSearch', function() {
    bsTree.breathFirstSearch(9).should.be.true;
    bsTree.breathFirstSearch(99999).should.be.false;
  });
});

describe('MinMaxHeap', function() {
  it('get indexes works', function() {
    let kids = MinMaxHeap.prototype.getKidsIndexes(2);
    kids.leftChild.should.equal(5)
    kids.rightChild.should.equal(6)
  });
  it('get parent index works', function() {
    MinMaxHeap.prototype.getParentIndex(6).parent.should.equal(2)
  })
  it('can make min heap', function() {
    let smallestNum = 3;
    let minHeap = new MinMaxHeap(true);
    minHeap.insert(4);
    minHeap.insert(6);
    minHeap.insert(33);
    minHeap.insert(88);
    minHeap.insert(33);
    minHeap.insert(6);
    minHeap.insert(smallestNum);
    minHeap.storage[0].should.equal(smallestNum);
  })
  it('can make max heap', function() {
    let largestNum = 100;
    let maxHeap = new MinMaxHeap();
    maxHeap.insert(5);
    maxHeap.insert(44);
    maxHeap.insert(88);
    maxHeap.insert(45);
    maxHeap.insert(78);
    maxHeap.insert(43);
    maxHeap.insert(11);
    maxHeap.insert(0);
    maxHeap.insert(largestNum);
    maxHeap.storage[0].should.equal(largestNum);
  });
  it('min max heap', function() {
    let minHeap = new MinMaxHeap(true);
    minHeap.insert(4);
    minHeap.insert(6);
    minHeap.insert(33);
    minHeap.insert(8);
    minHeap.insert(35);
    minHeap.insert(41);
    minHeap.remove().should.equal(4)
    minHeap.storage[0].should.equal(6);
  })
  it('min max heap', function() {
    let minHeap = new MinMaxHeap();
    minHeap.insert(4);
    minHeap.insert(6);
    minHeap.insert(33);
    minHeap.insert(8);
    minHeap.insert(35);
    minHeap.insert(41);
    minHeap.remove().should.equal(41)
    minHeap.storage[0].should.equal(35);
  });

});

describe('tries', function() {
  it('insert should work', function() {
    let tries = new Tries();
    tries.insert('dog');
    tries.insert('doing')
    tries.searchWord('dog').should.be.true;
    tries.searchWord('doing').should.be.true;
    tries.searchWord('do').should.be.false;
  });
  it('removing should work', function() {
    let tries = new Tries();
    tries.insert('dog');
    tries.insert('doing');
    tries.insert('do');
    tries.searchWord('dog').should.be.true;
    tries.removeWord('dog').should.be.true;
    tries.searchWord('dog').should.be.false;
    tries.searchWord('doing').should.be.true;
    tries.removeWord('doing').should.be.true;
    tries.searchWord('doing').should.be.false;
    tries.searchWord('do').should.be.true;
  })
});

describe('Graph', function() {

  let graph;
  let [i1, i2, i3, i4, i5, i6, i7, i8, i9, i10, i11, i12] = [];

  beforeEach(function() {
    graph = new Graph();
    i1 = graph.insert(4);
    i2 = graph.insert(67);
    i3 = graph.insert(44);
    i4 = graph.insert(38);
    i5 = graph.insert(9);
    i6 = graph.insert(1);
    i7 = graph.insert(14);
    i8 = graph.insert(14);
    i9 = graph.insert(8);
    i10 = graph.insert(41);
    i11 = graph.insert(96);
    i12 = graph.insert(100);
    graph.connect(i4, true, [i3]);
    graph.connect(i3, true, [i2]);
    graph.connect(i2, true, [i1]);
    graph.connect(i1, true, [i4]);
    graph.connect(i4, false, [i5, i6, i7, i8, i9, i10]);
    graph.connect(i5, false, [i6, i7, i8, i9, i10]);
    graph.connect(i6, false, [i7, i8, i9, i10]);
  })
  it('can insert nodes', function() {
    let graph = new Graph();
    graph.insert(3)
    graph.children[0].ID.should.equal(0);
    graph.children[0].value.should.equal(3)
    graph.insert(90);
    graph.children[1].ID.should.equal(1);
    graph.children[1].value.should.equal(90)
    Object.keys(graph.children).length.should.equal(2)
  });
  it('adding edges should work', function() {
    let graph = new Graph();
    let n1 = graph.insert(3);
    let n2 = graph.insert(53, true, [n1]);
    let n3 = graph.insert(4);
    let node1 = graph.getNode(n1);
    let node2 = graph.getNode(n2);
    node1.edges.should.deep.equal({[n2]: true});
    node2.edges.should.deep.equal({[n1]: true});
    graph.getNode(n3).edges.should.deep.equal({});
    let node3 = graph.getNode(n3);
    graph.connect(node3.ID, false, [0, 1]);
    node3.edges.should.deep.equal({0: true, 1: true})
    node1.edges.should.deep.equal({[n2]: true});
    node2.edges.should.deep.equal({[n1]: true});
  });

  it('removing edges should work', function() {
    let graph = new Graph();
    let n1 = graph.insert(3);
    let n2 = graph.insert(53, true, [n1]);
    let n3 = graph.insert(4);
    let node1 = graph.getNode(n1);
    let node2 = graph.getNode(n2);
    let node3 = graph.getNode(n3);
    graph.connect(node3.ID, false, [0, 1]);
    graph.remove(1);
    (graph.getNode(1) === undefined).should.be.true;
    graph.getNode(0).edges.should.deep.equal({})
  });

  it('depth frist search', function() {
    graph.depthFirstSearch(14).should.be.true;
    graph.getNode(0).searched.should.be.false
  });

  it('breadthFirstSearch', function() {
    graph.breadthFirstSearch(1).should.be.true;
    graph.getNode(0).searched.should.be.false
  });

  it('depthFirst search 2 nodes for path', function() {
    graph.depthFirstSearch2Nodes(0, 9).should.be.true;
    graph.depthFirstSearch2Nodes(0, 11).should.be.false;
  });

  it('breadth search 2 nodes for path', function() {
    graph.depthFirstSearch2Nodes(0, 9).should.be.true;
    graph.depthFirstSearch2Nodes(0, 11).should.be.false;
  });

  it('bi direction search', function() {
    graph.biDirectionBreadthSearch(0, 11).should.be.false;
  });
});

describe('minimalTree', function() {
  it('works: [1,2,3,4,5,6,7,8,9]', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    tree.value.should.equal(5);
    tree.leftChild.value.should.equal(3);
    tree.rightChild.value.should.equal(8);
  });

  it('works: [] should return null', function() {
    let arr = [];
    let tree = minimalTree(arr);
    (tree === null).should.be.true;
  });
});

describe('tree to level lists', function() {
  it('works for [1,2,3,4,5,6,7,8,9]', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    let lists = treeToLeveledLists(tree);
    let listsToArray = lists.reduce((arr, list) => {
      let numArr = [];
      while(list) {
        numArr.push(list.value);
        list = list.next;
      }
      arr.push(numArr);
      return arr;
    }, []);
    let result = [[5], [3,8], [2,4,7,9], [1,6]];
    listsToArray.should.deep.equal(result);
  });
  it('functional breadth first search', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    breadthFirstSearchFunctional(tree, 16).should.be.false;
  })
});

describe('check balance', function() {
  it('works for a minimalTree', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    checkBalance(tree).should.be.true;
  });
  it('should not work for an unbalance tree', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    tree.insert(10);
    tree.insert(11);
    checkBalance(tree).should.be.false;
  });
})

describe('validateBST', function() {
  it('works for a sorted minimalTree', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    validateBST(tree).should.be.true;
  });
  it(' does not work for a none binary search tree', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    tree.leftChild.leftChild.value = 999999;
    validateBST(tree).should.be.false;
  });
  it(' if nothing has passed in then, should return false', function() {
    validateBST(null).should.be.false;
  })

});

describe('successor', function() {
  it('works if node is not at the far right', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    let node = tree.leftChild
    successor(node).value.should.equal(4);
  });
});

describe('closestAncestor', function() {
  xit('works if both nodes are on the same path', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    let node1 = tree.leftChild.leftChild.leftChild
    let node2 = tree.leftChild;
    let ancestor = node2;
    closestAncestor(tree, node1, node2).should.equal(ancestor);
  });

  xit('works if both nodes are on different path', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    let node1 = tree.leftChild.leftChild.leftChild
    let node2 = tree.rightChild.rightChild;
    let ancestor = tree;
    closestAncestor(tree, node1, node2).should.equal(ancestor.value);
  });

});

describe('BSTSEquences', function() {
  it('crossConcat works', function() {
    let leftArr = [[1,2], [3,4]];
    let rightArr = [[5,6], [7,8]];
    let result = crossConcat(leftArr, rightArr);
    let testTarget = [
      [1,2,5,6],
      [1,2,7,8],
      [3,4,5,6],
      [3,4,7,8],
      [5,6,1,2],
      [5,6,3,4],
      [7,8,1,2],
      [7,8,3,4]
    ];
    result.should.deep.equal(testTarget);
  });
  it('crossConcat works with empty arr', function() {
    let leftArr = [];
    let rightArr = [[1,2],[3,4]];
    crossConcat(rightArr, leftArr).should.deep.equal(rightArr);
  });

  it('crossConcat works with two empty arr', function() {
    let leftArr = [];
    let rightArr = [];
    crossConcat(rightArr, leftArr).should.deep.equal(rightArr);
  });

  it('crossConcat works', function() {
    let leftArr = [[1,2], [3,4]];
    let rightArr = [[5,6], [7,8]];
    let result = crossConcat(leftArr, rightArr, (arr) => [9].concat(arr));
    let testTarget = [
      [9,1,2,5,6],
      [9,1,2,7,8],
      [9,3,4,5,6],
      [9,3,4,7,8],
      [9,5,6,1,2],
      [9,5,6,3,4],
      [9,7,8,1,2],
      [9,7,8,3,4]
    ];
    result.should.deep.equal(testTarget);
  });

  it('BSTSEquences works', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree = minimalTree(arr);
    let result = BSTSequences(tree)
    let testTarget = [
      [5,3,2,1,4,8,7,6,9],
      [5,3,2,1,4,8,9,7,6],
      [5,3,4,2,1,8,7,6,9],
      [5,3,4,2,1,8,9,7,6],
      [5,8,7,6,9,3,2,1,4],
      [5,8,7,6,9,3,4,2,1],
      [5,8,9,7,6,3,2,1,4],
      [5,8,9,7,6,3,4,2,1]
    ];
    result.should.deep.equal(testTarget);
  });
});

describe('checkSubtree', function() {
  it('should work', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree1 = minimalTree(arr);
    let tree2 = minimalTree(arr);
    checkSubtree(tree1, tree2).should.be.true;
  });
  it('should work', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree1 = minimalTree(arr);
    let arr2 = [1,2,3,4];
    let tree2 = minimalTree(arr2);
    checkSubtree(tree1, tree2).should.be.true;
  });
  it('should not work', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree1 = minimalTree(arr);
    let arr2 = [1,2,3,4,5.5,6,7,8,9];
    let tree2 = minimalTree(arr2);
    checkSubtree(tree1, tree2).should.be.false;
  });
  it('should not work', function() {
    let arr = [1,2,3,4,5,6,7,8,9];
    let tree1 = minimalTree(arr);
    let arr2 = [1,2,3,4];
    let tree2 = minimalTree(arr2);
    tree2.leftChild.leftChild.value = 'it is life';
    checkSubtree(tree1, tree2).should.be.false;
  });
});

describe('binary search tree, each node has left and right amount', function(){
  let arr = [1,2,3,4,5,6,7,8,9];
  let tree = new BinarySearchTree(5);
  tree.insert(3);
  tree.insert(4);
  tree.insert(2);
  tree.insert(1);
  tree.insert(7);
  tree.insert(6);
  tree.insert(8);
  tree.insert(9);

  let randomIndex = Math.floor(Math.random() * arr.length);
  let testTarget = arr[randomIndex];

  let result = tree.getRandomNode(0, randomIndex + 1).value
  console.log(result, testTarget)
  result.should.equal(testTarget);
});
