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
  });

  it('slice, from 0 index and on', function() {
    let resultArr = [1,1,1,4,5,6];
    list.slice().toArray().should.deep.equal(resultArr);
  });

  it('slice, from 0 and end on 4', function() {
    let resultArr = [1,1,1,4];
    list.slice(0, 4).toArray().should.deep.equal(resultArr);
  });

  it('slice, from 1 and end on 4', function() {
    let resultArr = [1,1,4];
    list.slice(1,4).toArray().should.deep.equal(resultArr);
  });
});
