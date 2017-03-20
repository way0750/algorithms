chai.should();
describe('', function() {
  qt(function() {
    longestValidParent('()').should.equal(2);
  });
  qt(function() {
    longestValidParent(')()()()').should.equal(6);
  });
  qt(function() {
    longestValidParent(')(()()())').should.equal(8);
  })
});
