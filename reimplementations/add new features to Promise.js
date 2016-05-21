// create a Promise method that creates a Promise object that is not settled but can call resolve or reject later on

//call the Promise constructor
//take out the resolve and reject functions 
//and set them as the new promise object's properties;

Promise.defer = function () {
  var resolveFunct;
  var rejectFunct;
  var pro = new Promise(function (resolve, reject) {
    resolveFunct = resolve;
    rejectFunct = reject;
  });
  pro.resolve = resolveFunct;
  pro.reject = rejectFunct;
  return pro;
};

var obj = Promise.defer();

obj.then(function (value){
  console.log('got the value:', value);
});

obj.catch(function(value){
  console.log('error:', value);
});

obj.resolve('see this?');
// obj.reject('see something wrong?');
