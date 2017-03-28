/*
   given a number find all possible comboes for it
   each number comes with 0 to 4 letters
   Input:Digit string "23"
   Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].


   start from right to left with an [[]];
   for each number you will add each letter to each of the subarray
*/

// recursive:
let phoneLetters  ={
  1: [''],
  0: [''],
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
}

let findCombos = function(str) {
  if (!str) return [''];
  let curChars = phoneLetters[str[0]];
  let subCombos = findCombos(str.slice(1));
  return subCombos.reduce((newComboes, subCombo) => {
    let newCombo = curChars.map((char) => char + subCombo);
    newComboes.push.apply(newComboes, newCombo);
    return newComboes;
  }, []);
};

let MyPromise = function(callBack) {
  this.state = 'pending';
  this.thenQueue = [];
  this.catchQueue = [];
  this.value = null;
  callBack = typeof callBack === 'function' ? callBack : () => {};
  callBack(this.resolve.bind(this), this.reject.bind(this));
};

MyPromise.all = function(promises) {
  let promisesAmount = promises.length;
  let values = [];
  let wrapperPromise = new MyPromise();
  promises.forEach((promises, index) => {
    promises.then((value) => {
      promisesAmount--;
      values[index] = value;
      if (!promisesAmount) {
        wrapperPromise.resolve(values);
      }
    });
  });

  return wrapperPromise;
};

MyPromise.prototype.fulFill = function(type, value) {
  let callBackWraps = type === 'resolve' ? this.thenQueue : this.catchQueue;
  this.value = value;
  this.state = type === 'resolve' ? 'resolved' : 'rejected';

  callBackWraps.forEach((callBackWrap) => callBackWrap(value));
}

MyPromise.prototype.resolve = function(value) {
  this.fulFill('resolve', value);
};

MyPromise.prototype.reject = function(value) {
  this.fulFill('reject', value);
};

MyPromise.prototype.then = function(callBack) {
  let thenPromise = new MyPromise();
  let callBackWrap = function(value) {
    callBack(value);
    thenPromise.resolve(value);
  };
  if (this.state === 'resolved') {
    callBackWrap(this.value);
  } else {
    this.thenQueue.push(callBackWrap);
  }
  return thenPromise;
};

xqt(function() {
  let pro = new MyPromise();
  let newPro = pro.then((value) => console.log('hey working yet', value));
  pro.resolve(99999)
});

xqt(function() {
  let pro1 = new MyPromise(function(resolve, reject){
    setTimeout(() => {resolve('pro1'); console.log('pro1')}, 1000);
  });
  let pro2 = new MyPromise(function(resolve, reject){
    setTimeout(() => {resolve('pro2'); console.log('pro2')}, 900);
  });
  let pro3 = new MyPromise(function(resolve, reject){
    setTimeout(() => {resolve('pro3'); console.log('pro3')}, 1500);
  });

  let bigPromise = Promise.all([pro1, pro2, pro3]);
  bigPromise.then((values) => {
    console.log('got the big promise: ', values);
  });
});
