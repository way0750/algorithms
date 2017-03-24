chai.should();
describe('', function() {
  it('decodeWays', function() {
    let code = '123';
    decodeWays(code).should.equal(3);
  });
  it('decodeWays 002', function() {
    let code = '1224';
    decodeWays(code).should.equal(5);
  });
  it('decodeWays 003', function() {
    let code = '2222222222222222222';
    decodeWays(code).should.equal(6765);
  });
  it('decodeWays 004', function() {
    let code = '12222222111112421222222';
    decodeWays(code).should.equal(33558);
  });
});
