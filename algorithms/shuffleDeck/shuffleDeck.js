/**
 * Given an array containing a deck of cards, implement a function that shuffles
 * the deck.
 *
 * Example:
 *  var deck = orderedDeck();
 *  // ["A♥","2♥","3♥",...,"J♦","Q♦","K♦"]
 *  shuffleDeck(deck);
 *  // ["2♠","J♣","A♦", ... ,"7♣","8♣","K♠"]
 *
 * Note:
 *   A shuffled deck should be completely random. That means that a given card should
 *   be as likely as any other to appear in a given deck index, completely independent
 *   of the order of the input deck. Think carefully about how to be sure your algorithm
 *   generates a properly shuffled deck-- it is easy to accidentally create a biased algorithm.
 *
 * Extra credit:
 *   - Even a naive algorithm can easily run in linear time. However, does your
 *     algorithm remain unbiased as N (the deck size) increases? How do you know?
 *   - Once you have created a properly random, linear algorithm, what is its space complexity?
 *     There is an algorithm that uses O(N) time and O(1) space (i.e., an in-place shuffle).
 *
 * A further note on randomness:
 *   Technically, a computer-shuffled deck will usually be "pseudorandom",
 *   not "truly" random. However, the difference between the two is too small to
 *   be detectable by any known test.
 *   See http://en.wikipedia.org/wiki/Pseudorandom_number_generator .
 *
 *   A human shuffler is much more biased; it takes around seven normal "riffle"
 *   shuffles before a real deck is actually randomized.
 *   See https://www.dartmouth.edu/~chance/teaching_aids/books_articles/Mann.pdf .
 */

// Ordered deck generator provided for your testing convenience
// (You may alter this function, but an unaltered copy will be used for tests.)
var orderedDeck = function() {
  var suits = [ '♥', '♣', '♠', '♦' ];
  var values = [ 'A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K' ];
  var deck = [];

  suits.forEach(function(suit) {
    values.forEach(function(value) {
      deck.push(value + suit);
    });
  });

  return deck;
};



//pick two randomly and swap them
//but how many times to do it? the more the better? N?
//N
let getRamdomNum = (start, end) => {
  let absValue = Math.abs(end - start);
  let randomNum = Math.floor(Math.random() * absValue);
  return randomNum + start;
};

let shuffleDeck = (arr) => {
  arr = arr.slice();
  let length = arr.length;
  let loopAmount = length;
  while (loopAmount--){
    let ran1 = getRamdomNum(0, length);
    let ran2 = getRamdomNum(0, length);
    let temp = arr[ran1];
    arr[ran1] = arr[ran2];
    arr[ran2] = temp;
  }
  return arr;
};

let deck = orderedDeck();
// shuffleDeck(deck);

//or loop the arr until second to last index, swap current element with a random one from next one and on

let shuffleDeck002 = (arr) => {
  arr = arr.slice();
  let length = arr.length;
  for (let i = 0 ; i < arr.length - 1; i++){
    let randomIndex = getRamdomNum(i+1, length);
    let temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
  return arr;
};

shuffleDeck002(deck);
