chai.should();
describe('palidrome', function() {
  it('true for aabbcc', function() {
    isPalidromable('aabbcc').should.be.true;
  });
  it('true for aaabbcc', function() {
    isPalidromable('aaabbcc').should.be.true;
  });
  it('false for abcc', function() {
    isPalidromable('abcc').should.be.false;
  })
});
