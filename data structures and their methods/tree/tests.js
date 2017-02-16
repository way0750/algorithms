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
  })

})
