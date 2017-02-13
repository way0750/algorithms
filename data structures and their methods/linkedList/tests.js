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

  it('KthToLast, find the last one', function() {
    list.KthToLast(1).value.should.equal(6);
  });

  it('KthToLast, find the second to last one', function() {
    list.KthToLast(2).value.should.equal(5);
  });

  it('KthToLast, found nothing return null', function() {
    (list.KthToLast(20) + '').should.equal('null');
  });

  it('deleteMiddle node, can not delete head or tail', function() {
    let head = list.head;
    let end = list.end;
    let resultArr = [1,1,1,4,5,6];
    list.deleteMiddle(head);
    list.deleteMiddle(end);
    list.toArray().should.deep.equal(resultArr);
  });

  it('deleteMiddle node, can delete', function() {
    let resultArr = [1,1,4,5,6];
    let node = list.head.next;
    list.deleteMiddle(node);
    list.toArray().should.deep.equal(resultArr);
  });

  it('partition', function() {
    let list = new LinkedList();
    list.insertFromEnd(5);
    list.insertFromEnd(6);
    list.insertFromEnd(7);
    list.insertFromEnd(2);
    list.insertFromEnd(3);
    list.insertFromEnd(1);
    list.insertFromEnd(9);
    list.insertFromEnd(4);
    list.insertFromEnd(8);
    list.partition(7)
    let result = [5, 6, 2, 3, 1, 4, 9, 7, 8];
    list.toArray().should.deep.equal(result);
  });

  it('add linked list', function() {
    let leftList = new LinkedList();
    leftList.insertFromEnd(7);
    leftList.insertFromEnd(1);
    leftList.insertFromEnd(6);
    let rightList = new LinkedList();
    rightList.insertFromEnd(5);
    rightList.insertFromEnd(9);
    rightList.insertFromEnd(2);
    let finalList = new LinkedList();
    finalList.insertFromEnd(2);
    finalList.insertFromEnd(1);
    finalList.insertFromEnd(9);
    addLinkedListNums(leftList, rightList)
    .toArray()
    .should
    .deep
    .equal(finalList.toArray());
  });

  it('add linked list with two different length', function() {
    let leftList = new LinkedList();
    leftList.insertFromEnd(7);
    leftList.insertFromEnd(1);
    leftList.insertFromEnd(6);
    let rightList = new LinkedList();
    rightList.insertFromEnd(5);
    rightList.insertFromEnd(9);
    rightList.insertFromEnd(9);
    rightList.insertFromEnd(2);
    let finalList = new LinkedList();
    finalList.insertFromEnd(2);
    finalList.insertFromEnd(1);
    finalList.insertFromEnd(6);
    finalList.insertFromEnd(3);
    addLinkedListNums(leftList, rightList)
      .toArray()
      .should
      .deep
      .equal(finalList.toArray());
  });

});
