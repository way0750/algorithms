// curry function
// take a function return a function if invoked without enough arguments
// but if invoke with enough arguments then return result

function curry (funt) {
  let allArgumets = [];
  let expectedArgsAmount = funt.length;
  return function curriedFunction () {
    let args = [].concat.apply([], arguments);
    allArgumets = allArgumets.concat(args);
    if (allArgumets.length >= expectedArgsAmount) {
      return funt.apply(null, allArgumets);
    } else {
      return curriedFunction;
    }
  };
}

function add (a,b,c) {
  return a + b + c;
}

let curriedAdd = curry(add);
curriedAdd(1)(2)(3);


// using es6 fat arrow:
// fat arrow function don't have arguments object and the this value
// but you can use (...args) to soak up all the arguments

let curry = (fn) => {
  let allArgs = [];
  let expectedArgsAmount = fn.length;
  let curriedUnfulfilled = (...args) => {
    allArgs = allArgs.concat(args);
    if (allArgs.length >= expectedArgsAmount) {
      return fn.apply(null, allArgs);
    } else {
      return curriedUnfulfilled;
    }
  };
  return curriedUnfulfilled;
};

function add (a,b,c) {
  return a + b + c;
}

let curriedAdd = curry(add);
curriedAdd(1)(2)(3);
