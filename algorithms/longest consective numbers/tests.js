chai.should();

describe('findLongestNumSeqImproved', function() {
  it('should return 8 for [12, 1, 11, 9, 3, 15, 10, 16, 4, 20, 2, 13, 14]', function() {
    let arr = [12, 1, 11, 9, 3, 15, 10, 16, 4, 20, 2, 13, 14];
    let result = findLongestNumSeqImproved(arr);
    result.should.equal(8);
  });

  it('should return 4 for [1,2,3,5,3]', function() {
    let arr = [1,2,3,5,3];
    let result = findLongestNumSeqImproved(arr);
    result.should.equal(4);
  })
});
