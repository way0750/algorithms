chai.should();
describe('', function() {
  it('decodeWays', function() {
    let code = '123';
    decodeWays(code).should.equal(3);
    decodeWays('12').should.equal(2);
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
  it('decodeWays 005', function() {
    let code = '120120120120120120120120';
    decodeWays(code).should.equal(57314)
  });
  it('decodeWays 006', function() {
    let code = '12012121212122121220120120120120';
    decodeWays(code).should.equal(2692538)
  });
});
