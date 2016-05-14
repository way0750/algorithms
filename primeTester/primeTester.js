/**
 * A prime number is a whole number that has no other divisors other than
 * itself and 1. Write a function that accepts a number and returns true if it's
 * a prime number, false if it's not.
 */


var primeTester = function(n) {
  if(typeof n !== 'number' || n < 1 || n % 1 !== 0){
    // n isn't a number or n is less than 1 or n is not an integer
    return false;
  }

  if (n > 3 && n % 2 === 0){return false;}

  var divisor = 3;
  var limit = Math.ceil(Math.sqrt(n));

  while(divisor <= limit){
    if (limit % divisor ===0 ){return false;}
    divisor+=2;
  }

  return true;
};




/* Extra credit: Write a function that generates a list of all prime numbers
 * in a user-specified range (inclusive). If you're not quite sure where to start,
 * check out the Sieve of Eratosthenes on Wikipedia. (And if you're feeling
 * saucy, check out the Sieve of Atkin.)
 */




// create numObj for each num from start to end and assign value 'true' to it
// loop through start to and include end
// set primeList to []
// and check current number against numObj, if found then push it into primeList
//  then set quantity to 2
//  then while loop: if current number * quantity <= end
//    then delete the product from numObj
// return primeList;
var primeSieve = function (start, end) {
  var primeList = [];
  var numRecord = {};
  for (var i = start; i <= end; i++) {
    numRecord[i] = true;
  }
  for (var n = 2; n <= end; n++ ){
      var quantity = 2;
      while ( n * quantity <= end ) {
        delete numRecord[n * quantity];
        quantity++;
      }
      if (numRecord[n] === true) {
        primeList.push(n);
      }
  }
  return primeList;
};

primeSieve(100, 10000);


function DoubleLinkList () {
  this.head = null;
  this.lastNode = null;
}

DoubleLinkList.prototype.insert = function(value) {

  var newNode = value instanceof Node ? value : new Node(value);

  if (this.head === null) {
    this.head = newNode;
    this.lastNode = newNode;
  } else {
    this.lastNode.next = newNode;
    newNode.prev = this.lastNode;
    this.lastNode = newNode;
  }
};

DoubleLinkList.prototype.remove = function (value) {
  //remove node with value
  //if removing last/head node then need to reassign them
  if (this.head.value === value){
    this.head = this.head.next;
    if (this.head.next) {
      this.head.next.prev = null;
    }
  } else if (this.lastNode.value === value) {
    this.lastNode.prev.next = null;

    var oldLastNode = this.lastNode;
    this.lastNode = this.lastNode.prev;
    oldLastNode.prev = null;
  } else {
    var curNode = this.head.next;
    while (curNode){
      if (curNode.value === vaule) {
        curNode.prev.next = curNode.next;
        curNode.next.prev = curNode.prev;
        return true; //for deleting a node
      } else {
        curNode = curNode.next;
      }
    }
  }
  return false; //for didn't delete any node

};

function Node (value) {
  this.value = value;
  this.prev = null;
  this.next = null;
}

Node.prototype.remove = function () {
  var prevNode = this.prev;
  var nextNode = this.next;
  if (prevNode !== null) {
    prevNode.next = nextNode;
  }
  if (nextNode !== null) {
    nextNode.prev = prevNode;
  }
};

function prime (start, end) {
  var numRecord = {};
  var numLinkList = new DoubleLinkList();
  for (var i = 2; i <= end; i++) {
    var node = new Node(i);
    numLinkList.insert(node);
    numRecord[i] = node;
  }

  //go through the link list
  var curNode = numLinkList.head;
  while(curNode !== null) {
    var nextNode = curNode;
    var product = curNode.value * nextNode.value;
    var nextToDel = [];
    while (product <= end){
      //delete num from record which will also delete from the link list
      numRecord[product].remove();
      delete numRecord[product];
      nextToDel.push(product);
      nextNode = nextNode.next;
      product = curNode.value * nextNode.value;
    }

    //go through nextToDel to delete more numbers
    product = curNode.value * nextToDel.shift();
    while ( product <= end ) {
      numRecord[product].remove();
      delete numRecord[product];
      product = curNode.value * nextToDel.shift();
    }
  }
  var primeList = [];
  curNode = numLinkList.head;
  while (curNode !== null) {
    primeList.push(curNode.value);
    curNode = curNode.next;
  }
  return primeList;
}
