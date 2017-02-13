chai.should();
describe('link list', function() {
  let list;

  beforeEach(function() {
    list = new LinkedList();
    list.insertFromEnd(1);
    list.insertFromEnd(1);
    list.insertFromEnd(1);
    list.insertFromEnd(4);
    list.insertFromEnd(5);
    list.insertFromEnd(6);
  });

  it('does it exist?', function() {
    LinkedList.should.be.a('function');
  });

  it('removeDup', function() {
    let resultList = new LinkedList();
    resultList.insertFromEnd(1);
    resultList.insertFromEnd(4);
    resultList.insertFromEnd(5);
    resultList.insertFromEnd(6);
    list.removeDup().toArray().should.deep.equal(resultList.toArray());
  })
});
