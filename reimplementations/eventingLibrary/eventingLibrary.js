/*
 * Make an eventing system mix-in that adds .trigger() and .on() to any input
 * object.
 *
 * Example usage:
 * var obj = mixEvents({ name: 'Alice', age: 30 });
 * obj.on('ageChange', function(){ // On takes an event name and a callback function
 *    console.log('Age changed');
 * });
 * obj.age++;
 * obj.trigger('ageChange'); // This should call our callback! Should log 'age changed'.
 *
 * Caveats:
 * - mixEvents should return the original object it was passed after extending it.
 * - If we repeatedly call .on with the same event name, it should
 *   continue to call the old function as well. That is to say, we can have multiple
 *   listeners for an event.
 * - If `obj.trigger` is called with additional arguments, pass those to the
 *   listeners.
 * - It is not necessary to write a way to remove listeners.
 */

var setEvent = function (eventName, callback) {
  this.eventList[eventName] = callback;
};

var triggerEvent = function (eventName) {
  var args = Array.apply(null, arguments).slice(1);
  return this.eventList[eventName].apply(this, args);
};

var mixEvents = function(obj) {
  obj.eventList = {};
  obj.on = setEvent;
  obj.trigger = triggerEvent;
  return obj;
};




//second version:
var mixEvents = (function() {
  var on = function (eventName, cb) {
    this.eventList[eventName]  = this.eventList[eventName] || [];
    this.eventList[eventName].push(cb);
  };

  var trigger = function (eventName) {
    var handlerList = this.eventList[eventName];
    handlerList.forEach((funct) => {
      setTimeout(funct.bind(this));
    });
  };

  return function (obj){
    obj.eventList = {};
    obj.on = on;
    obj.trigger = trigger;
    return obj;
  };

})();

var obj = mixEvents({ name: 'Alice', age: 30 });
obj.on('ageChange', function(){ // On takes an event name and a callback function
   console.log('Age changed');
});
obj.age++;
obj.trigger('ageChange'); // This should call our callback! Should log 'age changed'.
