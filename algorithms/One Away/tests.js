chai.should();
describe('one away', function() {
  it('true for pale ple', function() {
    oneAway('pale', 'ple').should.be.true;
  });
  it('false for pale peal', function() {
    oneAway('pale', 'peal').should.be.false;
  });
  it('false for pale pael', function(){
    oneAway('pale', 'pael').should.be.false;
  });
  it('true for pale pae', function(){
    oneAway('pale', 'pae').should.be.true;
  });
});
