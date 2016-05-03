/**
 * Create a hash table with `insert()`, `retrieve()`, and `remove()` methods.
 * The hashtable does not need to resize but it should still handle collisions.
 */

var makeHashTable = function(){
  var result = {};
  var storage = [];
  var storageLimit = 1000;

  result.insert = function(key, value){
    var hash = getIndexBelowMaxForKey(key, storageLimit);
    var bracket = storage[hash];
    if (Array.isArray(bracket)){
      var alreadyExist = false;
      for (var i = 0; i < bracket.length; i++){
        if (bracket[i][0]===key){
          bracket[i][1] = value;
          alreadyExist = true;
        }
        if (!alreadyExist){
          bracket.push([key, value]);
        }
      }

    } else {
      storage[hash] = [[key, value]];
    }
  };

  result.retrieve = function(key){
    var hash = getIndexBelowMaxForKey(key, storageLimit);
    var bracket = storage[hash];
    if (bracket){
      if (bracket.length < 2 ){
        return bracket[0][1] ? bracket[0][1] : undefined;
      } else {
        for (var i = 0; i < bracket.length; i++) {
          var singleBracket = bracket[i];
          if (singleBracket[0]===key){
            return singleBracket[1];
          }
        }
       }
    }
  };

  result.remove = function(key){
    var hash = getIndexBelowMaxForKey(key, storageLimit);
    var bracket = storage[hash];
    if (bracket){
      if (bracket.length < 2 ){
        storage[hash] = [];
      } else {
        for (var i = 0; i < bracket.length; i++) {
          storage[hash] = storage[hash].reduce(function(newBracket, pair){
            if (pair[0] !== key){newBracket.push(pair);}
            return newBracket;
          }, []);
        }
      }
    }    
  };

  return result;
};





// This is a "hashing function". You don't need to worry about it, just use it
// to turn any string into an integer that is well-distributed between
// 0 and max - 1
var getIndexBelowMaxForKey = function(str, max){
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = (hash<<5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash % max;
};
