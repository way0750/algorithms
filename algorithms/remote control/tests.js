chai.should();
describe('remote control', function() {
  it('getMatrixPos', function() {
    getMatrixPos('A').should.deep.equal({x: 1, y:1});
    getMatrixPos('E').should.deep.equal({x: 5, y:1});
    getMatrixPos('Z').should.deep.equal({x: 1, y:6});
  });

  it('getMovement', function() {
    getMovement('A', 'B').should.equal('R!');
    getMovement('A', 'Z').should.equal('DDDDD!');
    getMovement('E', 'Z').should.equal('LLLL!DDDDD!');
    getMovement('Z', 'E').should.equal('UUUUU!RRRR!');
  });

  it('getMovements', function() {
    getMovements('Z').should.equal('DDDDD!')
    getMovements('EZ').should.equal('RRRR!LLLL!DDDDD!');
  })
});
