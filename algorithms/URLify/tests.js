chai.should();
describe('URLify', function() {
  it('Mr John Smith', function() {
    let input = 'Mr John Smith    ';
    URLify(input).should.equal('Mr%20John%20Smith');
  });
  it('two spaces in front of  Mr John Smith', function() {
    let input = '  Mr John Smith    ';
    URLify(input).should.equal('%20%20Mr%20John%20Smith');
  });

});
