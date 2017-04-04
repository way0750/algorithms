chai.should();
describe('', function() {
  it('empty stirng should return -1', function() {
    let str = '';
    matchingParentAmount(str).should.equal(-1);
  });
  it('', function() {
    let str = '((((()()(())';
    matchingParentAmount(str).should.equal(4);
  });
  it('', function() {
    let str = '((()()(())';
    matchingParentAmount(str).should.equal(4);
  });
});
