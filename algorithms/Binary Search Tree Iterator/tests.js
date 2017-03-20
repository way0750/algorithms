chai.should();
describe('', function() {
  let tree;
  beforeEach(function() {
    let n1 = { value: 1 };
    let n4 = { value: 4 };
    let n3 = { value: 3, left: n1, right: n4};
    let n6 = { value: 6 };
    let n8 = { value: 8 };
    let n9 = { value: 9, left: n8 };
    let n7 = { value: 7, left: n6, right: n9 };
    let root = { value: 5, left: n3, right: n7 };
    tree = root;
  })
  it('BinarySearchTreeIterator', function() {
    let iterator = BinarySearchTreeIterator(tree);
    iterator.next().value.should.equal(1);
    iterator.next().value.should.equal(3);
    iterator.next().value.should.equal(4);
    iterator.next().value.should.equal(5);
    iterator.next().value.should.equal(6)
    iterator.next().value.should.equal(7)
    iterator.next().value.should.equal(8)
    iterator.next().value.should.equal(9);
    iterator.next().value.should.equal('done')
  });
});
