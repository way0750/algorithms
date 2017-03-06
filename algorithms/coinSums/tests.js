chai.should();
describe('coin sum', function() {
  let array = [200, 100, 50, 20, 10, 5, 2, 1];
  xit('return 1 for 1p', function() {
    coinSums(array, 1).should.equal(1);
  });
  xit('return 2 for 2p', function() {
    coinSums(array, 2).should.equal(2);
  });
  xit('return 4 for 5p', function() {
    coinSums(array, 5).should.equal(4);
  });
  it('return 12 for 10p', function() {
    coinSums(array, 10).should.equal(11);
  });
  it('return 12 for 10p', function() {
    coinSums(array, 100).should.equal(11);
  });
});
