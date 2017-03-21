chai.should();
describe('', function() {
  it('highWayBillboards', function() {
    let m = 20;
    let pos = [6,7,12,13,14];
    let revenue = [5,6,5,3,1];
    let t = 5;
    highWayBillboards(m, pos, revenue, t).should.equal(10);
  });
  it('highWayBillboards', function() {
    let m = 15;
    let pos = [ 6, 9, 12, 14 ];
    let revenue = [ 5, 6, 3, 7 ];
    let t = 2;
    highWayBillboards(m, pos, revenue, t).should.equal(18);
  })
});
