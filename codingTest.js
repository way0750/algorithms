/*
   
*/


let arrayTraversal = (arr, callBack) => {
  arr.forEach(callBack);
}

describe('this is very important', function() {
  it('should go through', function() {
    let arr = [1,2,3,4,5];
    let amount = 0;
    arrayTraversal(arr, () => amount++);
    amount.should.equal(arr.length);
  });
  it('hey ther', function() {
    let arr = [];
    let amount = 0;
    arrayTraversal(arr, () => amount++)
    amount.should.equal(0);
  });
});
