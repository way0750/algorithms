chai.should();
describe('zero matrix', function() {
  it('works?', function() {
    let matrix = [
      [1,1,1,1],
      [0,1,1,1],
      [1,0,1,1],
      [1,1,1,1],
    ];
    let result = [
      [0,0,1,1],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,1,1],
    ];
    zeroMatrix(matrix).should.deep.equal(result);
  });
});
