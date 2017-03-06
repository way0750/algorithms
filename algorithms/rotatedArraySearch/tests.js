chai.should();
describe('', function() {
  it('getMidIndex should work', function() {
    getMidIndex(3, 8).should.equal(5);
  });
  it('getArrayStat should work', function() {
    let array = [6,7,8,9,1,2,3,4,5];
    let result = getArrayStat(array, 7, 0, 4, 8);
    console.log(result)
    result.should.deep.equal({
      leftSortedWithTarget: false,
      rightSortedWithTarget: false,
      leftRotated: true,
      rightRotated: false,
    });
  });
  it('searchRotatedArray works', function() {
    let array = [6,7,8,9,1,2,3,4,5];
    let result = searchRotatedArray(array, 7);
    result.should.equal(1);
  });
  it('searchRotatedArray works', function() {
    let array = [6,7,8,9,1,2,3,4,5];
    let result = searchRotatedArray(array, 6);
    result.should.equal(0);
  });
  it('searchRotatedArray works', function() {
    let array = [6,7,8,9,1,2,3,4,5];
    let result = searchRotatedArray(array, 5);
    result.should.equal(8);
  });
});
