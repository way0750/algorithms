chai.should();
describe('zero matrix', function() {
  it('matrix of 4 by 4', function() {
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

  it('matrix of 2 by 4', function() {
    let matrix = [
      [1,1],
      [0,1],
      [0,1],
      [1,1],
    ];
    let result = [
      [0,1],
      [0,0],
      [0,0],
      [0,1],
    ];
    zeroMatrix(matrix).should.deep.equal(result);
  });
});
