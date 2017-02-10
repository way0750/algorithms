chai.should();
describe('check permutations', function() {

  it('makeStringRecord', function() {
    let record = { uniq: ['a', 'b'], a:1, b:2 };
    makeStringRecord('abb').should.deep.equal(record);
  });

  it('true for abc, bca, cab', function() {
    checkPermutation('abc', 'bca', 'cab').should.be.true;
  });

  it('false for abc, bcaa', function() {
    checkPermutation('abc', 'bcaa').should.be.false;
  })

  it('false for abcb, bcaa', function() {
    checkPermutation('abcb', 'bcaa').should.be.false;
  })
});
