chai.should();
describe('is unique', function() {
  it('return true for abcd ', function() {
    //hey().should.be.a('string');
    isUnique('abcd').should.be.true;
  });
  it('return false for aabj', function() {
    isUnique('aabj').should.be.false;
  })
});
