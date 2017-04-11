chai.should();
describe('', function() {
  it('got 24?', function() {
    let arr = [2,8,5,6,7,3,9];
    houseRobber(arr).should.equal(24);
  });
  it('empty array gets 0', function() {
    houseRobber([]).should.equal(0);
  });
});
