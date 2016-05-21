/*
 * function bind():
 *
 * example 1:
 *
 * var alice = {
 *   name: 'alice',
 *   shout: function(){
 *     alert(this.name);
 *   }
 * }
 * var boundShout = bind(alice.shout, alice);
 * boundShout(); // alerts 'alice'
 * boundShout = bind(alice.shout, {name: 'bob'});
 * boundShout(); // alerts 'bob'
 *
 * example 2:
 *
 * var func = function(a, b){ return a + b };
 * var boundFunc = bind(func, null, 'foo');
 * var result = boundFunc('bar');
 * result === 'foobar'; // true
 *
*/

var bind = function(funct, self) {
  var args = Array.apply(null, arguments).slice(2);
  return function () {
    var newArgs = Array.apply(null, arguments);
    return funct.apply(self, args.concat(newArgs));
  };
};

/*
 * Function.prototype.bind:
 *
 * example 1:
 *
 * var alice = {
 *   name: 'alice',
 *   shout: function(){
 *     alert(this.name);
 *   }
 * }
 * var boundShout = alice.shout.bind(alice);
 * boundShout(); // alerts 'alice'
 * boundShout = alice.shout.bind({name: 'bob'});
 * boundShout(); // alerts 'bob'
 *
 * example 2:
 *
 * var func = function(a, b){ return a + b };
 * var boundFunc = func.bind(null, 'foo');
 * var result = boundFunc('bar');
 * result === 'foobar'; // true
 *
*/

Function.prototype.bind = function(self) {
  var args = Array.apply(null, arguments).slice(1);
  var funct = this;
  return function () {
    var newArgs = Array.apply(null, arguments);
    return funct.apply(self, args.concat(newArgs));
  };
};



function bind (funct, self) {
  var prefillArgs = Array.apply(null, arguments).slice(2);
  return function () {
    var additionalArgs = Array.apply(null, arguments);
    var finalArgsList = prefillArgs.concat(additionalArgs);
    return funct.apply(self, finalArgsList);
  };
}




var alice = {
  name: 'alice',
  shout: function(){
    alert(this.name);
  }
};

var func = function(a, b){ return a + b };
var boundFunc = bind(func, null, 'foo');
var result = boundFunc('bar');
console.log(result)
result === 'foobar'; // true






//reimplement

Function.prototype.customBind = function (self) {
  var prefillArgs = Array.apply(null, arguments).slice(1);
  var funct = this;
  return function () {
    var additionalArgs = Array.apply(null, arguments);
    var finalArgsList = prefillArgs.concat(additionalArgs);
    return funct.apply(self, finalArgsList);
  };
};



function bind (funct, self) {
  var prefillArgs = Array.apply(null, arguments).slice(2);
  return function () {
    var additionalArgs = Array.apply(null, arguments);
    var finalArgsList = prefillArgs.concat(additionalArgs);
    return funct.apply(self, finalArgsList);
  };
}

var alice = {
  name: 'alice',
  shout: function(){
    alert(this.name);
  }
};

var func = function(a, b){ return a + b };
// var boundFunc = bind(func, null, 'foo');
var boundFunc = func.customBind(null, 'foo');
var result = boundFunc('bar');
console.log(result)
result === 'foobar'; // true
