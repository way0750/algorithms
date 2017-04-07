chai.should();
describe('', function() {
  it('empty array? should return ["0->99"]', function() {
    findMissingRanges([]).should.deep.equal(['0->99']);
  });
  it('works if not empty', function() {
    let arr = [0, 1, 3, 50, 75];
    let expected = ['2', '4->49', '51->74', '76->99'];
    findMissingRanges(arr).should.deep.equal(expected);
  });
});
