chai.should();
describe('', function() {
  it('minPath', function() {
    let tri = [
      [2],
      [3,4],
      [6,5,7],
      [4,1,8,3]
    ];
    minPath(tri).should.equal(11);
  });
  it('minPath', function() {
    let tri = [
      [2],
      [0,4],
      [6,5,7],
      [4,1,8,3]
    ];
    minPath(tri).should.equal(8);
  });
});
