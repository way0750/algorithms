chai.should();
describe('rotate matrix in place', function() {
  let matrix = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
  ];

  it('rotate 90', function() {
    let result = [
      [7,4,1],
      [8,5,2],
      [9,6,3],
    ];
    rotateMatrixInPlace(matrix).toString().should.equal(result.toString());
  });

  it('rotate 180', function() {
    let result = [
      [9,8,7],
      [6,5,4],
      [3,2,1],
    ];
    rotateMatrixInPlace(matrix, 180).toString().should.equal(result.toString());
  });

  it('rotate 270', function() {
    let result = [
      [3,6,9],
      [2,5,8],
      [1,4,7],
    ];
    rotateMatrixInPlace(matrix, 270).toString().should.equal(result.toString());
  });

  it('rotate 630', function() {
    let result = [
      [3,6,9],
      [2,5,8],
      [1,4,7],
    ];
    rotateMatrixInPlace(matrix, 630).toString().should.equal(result.toString());
  });
  it('rotate -90', function() {
    let result = [
      [3,6,9],
      [2,5,8],
      [1,4,7],
    ];
    rotateMatrixInPlace(matrix, -90).toString().should.equal(result.toString());
  });

});
