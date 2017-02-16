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
  })
});
