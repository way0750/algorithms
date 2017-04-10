chai.should();
describe('', function() {
  it('works', function() {
    let expected = maxArraySum([4,-1,2,1,-5,4]);
    expected.should.equal(6);
  });
  it('should return -Inifity if empry array', function() {
    maxArraySum([]).should.equal(-Infinity);
  })
});
