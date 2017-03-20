chai.should();
describe('', function() {
  it('smallestAmountOfChange', function() {
    let coins = [20, 15, 10, 5, 4, 1];
    let target = 23;
    smallestAmountOfChange(coins, target).should.equal(3);
  });
  it('smallestAmountOfChange', function() {
    let coins = [20, 15, 10, 5, 4, 1];
    let target = 8;
    smallestAmountOfChange(coins, target).should.equal(2);
  });
});
