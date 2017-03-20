chai.should();
describe('', function() {
  it('longestValidParent 1', function() {
    longestValidParent('()').should.equal(2);
  });
  it('longestValidParent 2', function() {
    longestValidParent(')()()()').should.equal(6);
  });
  it('longestValidParent 3', function() {
    longestValidParent(')(()()())').should.equal(8);
  })
});
