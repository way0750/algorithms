chai.should();
describe('', function() {
  it('works', function() {
    longestUniqSubstring('abcabcbb').should.equal(3);
    longestUniqSubstring('bbbbb').should.equal(1)
    longestUniqSubstring('pwwkew').should.equal(3);
  });
});
