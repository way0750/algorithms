chai.should();
describe('', function() {
  let makeGrid = function(row, col) {
    let r = Array(row).fill(0);
    let grid = Array(col).fill(r);
    return grid;
  };

  it('uniquePaths', function() {
    let grid = makeGrid(4,4)
    uniquePaths(grid).should.equal(20);
  });

  it('uniquePaths', function() {
    let grid = makeGrid(3, 6)
    uniquePaths(grid).should.equal(21);
  });

  it('uniquePaths', function() {
    let grid = makeGrid(6, 8)
    uniquePaths(grid).should.equal(792);
  });

  it('uniquePaths', function() {
    let grid = makeGrid(20, 20)
    uniquePaths(grid).should.equal(35320503923);
  });
  it('uniquePaths', function() {
    let grid = []
    uniquePaths(grid).should.equal(0);
  });
});
