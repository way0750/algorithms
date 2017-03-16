chai.should();
describe('', function() {
  it('works', function() {
    longestUniqSubstring('abcabcbb').should.equal(3);
    longestUniqSubstring('bbbbb').should.equal(1)
    longestUniqSubstring('pwwkew').should.equal(3);
  });
  it('this might take very long:', function() {
    let str = 'abcdefghijklmnopqrstuvwxyz'.repeat(2600);
    longestUniqSubstring(str).should.equal(26);
  });
});
