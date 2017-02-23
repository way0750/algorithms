chai.should();
describe('evenPartition', function() {
  it('false for odd sum', function() {
    let arr = [1,2,3,4,5,6];
    evenPartition(arr).should.be.false;
  });

  it('return false', function() {
    let arr = [4,4,4,8];
    evenPartition(arr).should.be.false;
  });

  it('return true', function() {
    let arr = [1,1,2,2,4,4];
    evenPartition(arr).should.be.true;
  });

  it('return true if included negative numbers', function() {
    let arr = [-4,1,1,2,2,4,4];
    evenPartition(arr).should.be.true
  });
});
