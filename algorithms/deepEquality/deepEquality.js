
// *
//   * Write a function that, given two objects, returns whether or not the two
//   * are deeply equivalent--meaning the structure of the two objects is the
//   * same, and so is the structure of each of their corresponding descendants.
//   *
//   * Examples:
//   *
//   deepEquals({a:1, b: {c:3}},{a:1, b: {c:3}}); // true
//   deepEquals({a:1, b: {c:5}},{a:1, b: {c:6}}); // false
//   *
//   * don't worry about handling cyclical object structures.
//   *
 

  
 
 // base case: no nested object
 // how to break, loop through all keys, pass when value is object
 // what to return: true or false
 // what to do about return: keep on returning it
var isObject = function (value) {
  return typeof value === 'object' && value !== null;  
};

var deepEquals = function(apple, orange){
  var appleKeys = Object.keys(apple);
  var orangeKeys = Object.keys(orange);

  if (appleKeys.length !== orangeKeys.length){
    return false;
  }

  return appleKeys.every(function (key) {
    // only recursively call nested objects
    // if values of the same key in both apple and orange
    // are objects.
    if (isObject(apple[key]) && isObject(orange[key])){
      return deepEquals(apple[key], orange[key]);
    } else {
      return apple[key] === orange[key]; 
    }

  });

};

deepEquals = function (apple, orange) {

 if (isObject(apple) && isObject(orange)){
 var appleKeys = Object.keys(apple);
    var orangeKeys = Object.keys(orange);
 if (appleKeys.length !== orangeKeys.length){
      return false;
    }

 return appleKeys.every(function (key) {
 if (isObject(apple[key]) && isObject(orange[key])) {
        return deepEquals(apple[key], orange[key]);
      } else {
        return apple[key] === orange[key]; 
      }

    });
 } else {
    return apple === orange;
  }

};




//third version:

function isObject (value) {
  var instanceofObject = value instanceof Object;
  return instanceofObject;
}

function deepEquals(obj1, obj2) {
  var keys1 = Object.keys(obj1);
  var keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length){
    return false;
  }
  return keys1.every(function (propName) {
    if (obj1.hasOwnProperty(propName) === false || obj2.hasOwnProperty(propName) === false){
      return false;;
    }
    var v1 = obj1[propName];
    var v2 = obj2[propName];
    if (isObject(v1) && isObject(v2)){
      return deepEquals(v1, v2);
    } else {
      return v1 === v2;
    }
  });
}
