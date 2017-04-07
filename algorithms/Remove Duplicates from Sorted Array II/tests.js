chai.should();
describe('', function() {
  it('should return 6', function() {
    let arr = [1,1,1,1,1,1,1,2,2,3,3];
    removeDupplicates(arr).should.equal(6);
  });

  it('return 0 for empty array', function() {
    let arr = [];
    removeDupplicates(arr).should.equal(0);
  })
});
