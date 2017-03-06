chai.should();
describe('', function() {
  let array;
  beforeEach(function() {
    array = [6,7,8,9,1,2,3,4,5];
  });
  it('getMidIndex should work', function() {
    getMidIndex(3, 8).should.equal(5);
  });
  it('getArrayStat should work', function() {
    let result = getArrayStat(array, 7, 0, 4, 8);
    console.log(result)
    result.should.deep.equal({
      leftSortedWithTarget: false,
      rightSortedWithTarget: false,
      leftRotated: true,
      rightRotated: false,
    });
  });
  it('searching 7 works', function() {
    let result = searchRotatedArray(array, 7);
    result.should.equal(1);
  });
  it('searching 6 works', function() {
    let result = searchRotatedArray(array, 6);
    result.should.equal(0);
  });
  it('searching 5 works', function() {
    let result = searchRotatedArray(array, 5);
    result.should.equal(8);
  });
  it('searching 15 does NOT works', function() {
    let result = searchRotatedArray(array, 15);
    (result === null).should.be.true;
  });
});
