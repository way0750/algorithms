chai.should();
describe('', function() {
  it('works for 3', function() {
    let expected = [
      [ 1, 2, 3 ],
      [ 8, 9, 4 ],
      [ 7, 6, 5 ]
    ];
    let result = makeSpiralMatrix(3)
    result.should.be.deep.equal(expected);
  });

  it('works for 4', function() {
    let expected = [
      [1,2,3,4],
      [12,13,14,5],
      [11,16,15,6],
      [10,9,8,7],
    ];
    let result = makeSpiralMatrix(4)
    result.should.be.deep.equal(expected);
  })

  it('works if input is 0 or smaller: returns empty array', function() {
    makeSpiralMatrix(0).should.be.deep.equal([]);
    makeSpiralMatrix(-10).should.be.deep.equal([]);
  })
});
