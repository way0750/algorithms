chai.should();
describe('URLify', function() {
  it('Mr John Smith', function() {
    let input = 'Mr John Smith    ';
    URLify(input).should.equal('Mr%20John%20Smith');
  });
});
