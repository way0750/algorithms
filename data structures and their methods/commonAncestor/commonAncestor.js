
/**
  * implement the function `getClosestCommonAncestor` and `getAncestorPath`
  * in the following Tree class
  */

/** example usage:
  * var grandma = new Tree();
  * var mom = new Tree();
  * grandma.addChild(mom);
  * var me = new Tree();
  * mom.addChild(me);
  * grandma.getAncestorPath(me); // => [grandma, mom, me]
*/

var Tree = function(value){
  this.value = value
  this.children = [];
  this.ancestor = null;
};

/**
  * add an immediate child
  */
Tree.prototype.addChild = function(child){
  if(!this.isDescendant(child)){
    this.children.push(child);
    child.ancestor = this;
  }else {
    throw new Error("That child is already a child of this tree");
  }
  return this;
};

/**
  * return the lowest common ancestor of the two child nodes.
  * (assume for these examples that only a women can be the parent of a child)
  * more examples:
  *  1.) between me and my brother -> my mom
  *  2.) between me and my cousin -> my grandma
  *  3.) between my grandma and my grandma -> my grandma
  *  4.) between me and a potato -> null
  */
 
//get ancestor path for both nodes from themselves to all the way to the top
//then compare both path to find closest ancestor
//
//or can try to mark each node as each node travel up
//anytime run into that has been mark, that the closest ancestor
//but you are modifying the input
//
//or stringify each node and use the string as key, the node as value
//each time go through a node, check and see if it already has been saved, if yes, then that is the closest
//
Tree.prototype.getClosestCommonAncestor = function(target){  
  var vistedNodes = {};
  var selfAncestor = this;
  var targetAncestor = target;
  if (selfAncestor === targetAncestor) {
    return this;
  }
  while (selfAncestor && targetAncestor) {
    var selfAncestorKey = JSON.stringify(selfAncestor);
    var targetAncestorKey = JSON.stringify(targetAncestor);
    if (vistedNodes[selfAncestorKey] || vistedNodes[targetAncestorKey]) {
      return vistedNodes[selfAncestorKey] || vistedNodes[targetAncestorKey];
    } else {
      vistedNodes[selfAncestorKey] = selfAncestor;
      vistedNodes[targetAncestorKey] = targetAncestor;
    }
  }
  return null;
};


Tree.prototype.search = function (target) {
  if (this === target) {
    return target;
  } else {
    for (var i = this.children.length - 1; i >= 0; i--) {
      var curNode = this.children[i];
      var foundTarget = curNode.search(target);
      if (foundTarget) {
        return foundTarget;
      }
    }
  }
  return null;
};


/**
  * check to see if the provided tree is already a child of this
  * tree __or any of its sub trees__
  */
Tree.prototype.isDescendant = function(child){
  if(this.children.indexOf(child) !== -1){
    // `child` is an immediate child of this tree
    return true;
  }else{
    for(var i = 0; i < this.children.length; i++){
      if(this.children[i].isDescendant(child)){
        // `child` is descendant of this tree
        return true;
      }
    }
    return false;
  }
};

/**
  * remove an immediate child
  */
Tree.prototype.removeChild = function(child){
  var index = this.children.indexOf(child);
  if(index !== -1){
    // remove the child
    this.children.splice(index,1);
  }else{
    throw new Error("That node is not an immediate child of this tree");
  }
};


/**
  * should return the ancestral path of a child to this node.
  * more examples:
  * 1.) greatGrandma.getAncestorPath(me) -> [great grandma, grandma, mom, me]
  * 2.) mom.getAncestorPath(me) -> [mom, me]
  * 3.) me.getAncestorPath(me) -> [me]
  * 4.) grandma.getAncestorPath(H R Giger) -> null
  */


// using depth first search:
Tree.prototype.getAncestorPath = function(desc){
  //from current node to desc node
  //use depth first search:
  //search from current node to all desc until hitting desc, if nothing found return null;
  //base case: if this === desc found and return [this];
  //          if there is no children: return null;
  //how to break smaller: go through each child
  //what to return: either an array if path is found, or null
  //what to do about return, unshift 'this' to array and return
  if (this === desc) {
    return [this.value];
  }

  for (var i = 0; i < this.children.length; i++) {
    var childNode = this.children[i];
    var foundPath = childNode.getAncestorPath(desc);
    if (foundPath){
      foundPath.unshift(this.value);
      return foundPath;
    }
  }
  return null;
};



//using depth but from the bottom and up using ancestor
Tree.prototype.getAncestorPath = function(desc) {
  //keep searching from bottom up if there is an ancestor
  //else if no ancestor then return null
  var path = [this.value];
  if (this === desc) {
    return path;
  }
  var curAncestor = desc.ancestor;
  while (curAncestor) {
    path.unshift(curAncestor.value);
    if (curAncestor === this) {
      return path;
    } else {
      curAncestor = curAncestor.ancestor;
    }
  }
  return null;
};


//test case:
var grandma = new Tree('grandma');
var mom = new Tree('mom');
grandma.addChild(mom);
var me = new Tree('me');
mom.addChild(me);
grandma.getAncestorPath(me); // => [grandma, mom, me]


//get ancestor path for both nodes from themselves to all the way to the top
//then compare both path to find closest ancestor
//
//or can try to mark each node as each node travel up
//anytime run into that has been mark, that the closest ancestor
//but you are modifying the input
//
//or stringify each node and use the string as key, the node as value
//each time go through a node, check and see if it already has been saved, if yes, then that is the closest
//
Tree.prototype.getClosestCommonAncestor = function(target){  
  var vistedNodes = {};
  var selfAncestor = this;
  var targetAncestor = target;
  if (selfAncestor === targetAncestor) {
    return this;
  }
  while (selfAncestor || targetAncestor) {
    var selfAncestorKey = selfAncestor.value;
    var targetAncestorKey = targetAncestor.value;
    var foundCommonAncestor  = vistedNodes[selfAncestorKey] || vistedNodes[targetAncestorKey];
    if (foundCommonAncestor) {
      return foundCommonAncestor;
    } else {
      vistedNodes[selfAncestorKey] = selfAncestor;
      vistedNodes[targetAncestorKey] = targetAncestor;
      selfAncestor = selfAncestor ? selfAncestor.ancestor : null;
      targetAncestor = targetAncestor ? targetAncestor.ancestor : null;
    }

  }
  return null;
};

me.getClosestCommonAncestor(mom);
