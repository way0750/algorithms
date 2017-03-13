chai.should();
describe('', function() {
  it('checking makePermute', function() {
    let string = 'ab';
    let char = 'c';
    let arr = [];
    let insertToArr = (str) => arr.push(str);
    makePermute(char, string, insertToArr)
    arr.should.deep.equal([
      'cab',
      'acb',
      'abc',
    ]);
  });

  it('allAnagrams returns array of one empty string for empty stirng', function() {
    allAnagrams('').should.deep.equal(['']);
  })

  it('allAnagrams works', function() {
    let result = ["abcd", "bacd", "bcad", "bcda", "acbd", "cabd", "cbad",
      "cbda", "acdb", "cadb", "cdab", "cdba", "abdc", "badc", "bdac", "bdca",
      "adbc", "dabc", "dbac", "dbca", "adcb", "dacb", "dcab", "dcba"];
    allAnagrams('abcd').should.deep.equal(result);
  });
});
