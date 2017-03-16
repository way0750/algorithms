chai.should();
describe('', function() {
  it('works?', function() {
    let s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT";
    getRepeatedString(s).should.deep.equal(["AAAAACCCCC", "CCCCCAAAAA"])
  });
});
