/**
 * Implement a function that takes a URL and a callback and makes a JSONP
 * GET request to that URL.
 *
 * We've provided the following API endpoint:
 *   http://toy-problems.hackreactor.com/jsonparty
 *
 * Your function should accept a call with that URL, and call the callback
 * with the response data from the server. You should NOT return the response
 * from the server, only the wrapped data! jQuery is not available, and you won't
 * be able to do this using a native XMLHttpRequest.
 *
 * Example:
 *   jsonpRequest('http://toy-problems.hackreactor.com:3003/jsonparty', function (data) {
 *     console.log(data.response); // "Aw yeah, now we're JSONPartying"
 *     console.log(data.random); // 3558
 *   });
 *
 *   // Subsequent requests should have properly random responses:
 *   jsonpRequest('http://toy-problems.hackreactor.com:3003/jsonparty', function (data) {
 *     console.log(data.random); // 1733
 *   });
 *
 * Hint: The API accepts a `callback` parameter. What is that for?
 * See http://en.wikipedia.org/wiki/JSONP if you need more information
 * about this exciting AJAX protocol!
 *
 * Feel free to use Google in searching for your ideal implementation!
 */


//make global call back function with unique name
//make url with callback in it
//
//make a function that creates a script tag then add url as src
//  then add script tag to head as a way to make request

var globalCallbackForMakingJSONPRequest = function (data) {
  console.log('got the data:', data);
};

var headTag = document.getElementsByTagName('head')[0];

var makeJSONPRequest = function (url, cb) {
  globalCallbackForMakingJSONPRequest = cb || globalCallbackForMakingJSONPRequest;

  var scriptID = 'JSONPRequestMaker';
  var foundScriptTag = document.getElementById(scriptID);
  if (foundScriptTag) {
    headTag.removeChild(foundScriptTag);
  }

  url += '?&callback=globalCallbackForMakingJSONPRequest';
  var scriptTag = document.createElement('script');
  scriptTag.src = url;
  scriptTag.id = scriptID;
  headTag.appendChild(scriptTag);
};

makeJSONPRequest('http://toy-problems.hackreactor.com:3003/jsonparty', function (data) {
  console.log(data);
});
