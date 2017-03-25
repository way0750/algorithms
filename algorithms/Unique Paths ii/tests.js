chai.should();
describe('', function() {
  it('unique paths ii', function() {
    let grid = [
      [0,0,0],
      [0,'x',0],
      [0,0,0],
    ];
    uniquePathsII(grid).should.equal(2)
  });
  it('empty grid should return 0', function() {
    uniquePathsII([]).should.equal(0);
  });
  it('a big one', function() {
    let grid = [
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
    ];
    uniquePathsII(grid).should.equal(75582);
  });
  it('another one', function() {
    let x = 'x';
    let grid = [
      [0,0,0,0,0,0,0,0,0,0,0,x],
      [0,0,0,0,0,0,x,0,0,0,0,0],
      [0,0,0,0,x,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,x,0,0,0],
      [0,0,0,0,0,0,0,0,0,x,0,x],
      [0,0,0,0,x,0,x,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0,0,0],
    ]
    uniquePathsII(grid).should.equal(14889);
  });
});
