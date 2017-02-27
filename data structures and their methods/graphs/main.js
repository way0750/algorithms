class UndirectedGraph {
  constructor() {
    this.nextNodeId = 0;
    this.nodes = [];
  }

  getNode(id) {
    return this.nodes[id];
  }
  showNodes() {
    // return a copy of all nodes
    return this.nodes.slice();
  }

  addNodeWithValue(value, edges=[]) {
    const newNodeId = this.nextNodeId++
    const newNode = new Node(newNodeId, edges, value);
    this.nodes[newNodeId] = newNode;
    return newNode;
  }

  addNode(...edges) {
    const newNodeId = this.nextNodeId++
    const newNode = new Node(newNodeId, edges);
    edges.forEach((edge) => {
      // find id add edge
      // can't add self as edge
      if (edge !== newNodeId && this.nodes[edge]) {
        this.nodes[edge].edges[newNodeId] = true;
      }
    });
    this.nodes[newNodeId] = newNode;
    return newNode;
  }

  addEdge(fromNodeID1, toNodeID2, bothWay = false) {
    const fromNode1 = this.nodes[fromNodeID1];
    const toNode2 = this.nodes[toNodeID2];
    if (fromNode1 && toNode2) {
      fromNode1.edges[toNodeID2] = true;
      if (bothWay) toNode2.edges[fromNodeID1] = true;
    } else {
      console.log('one or both nodes do not exist');
    }
  }

  addBatchEdges(sourceNodeID, ...targetNodeIds) {
    const sourceNode = this.nodes[sourceNodeID];
    if (sourceNode) {
      targetNodeIds.forEach((targetNodeId) => {
        const targetNode = this.nodes[targetNodeId];
        if (targetNode) {
          targetNode.edges[sourceNodeID] = true;
          sourceNode.edges[targetNodeId] = true;
        }
      });
    }
  }

  clearVisitedFlags() {
    this.nodes.forEach((node) => {
      node.visited = false;
    })
  }

  depthFirstSearch(callBack) {
    callBack = callBack || ((node) => console.log(`visiting ${node.id}`));
    const search = (node) => {
      node.visited = true;
      const allConnectedNodes = node.connectedNodeIDs();
      allConnectedNodes.forEach((id) => {
        const node = this.nodes[id];
        if (node && !node.visited) {
          search(node);
        }
      });
      callBack(node);
    };

    this.nodes.forEach((node) => {
      if (!node.visited) {
        search(node);
      }
    });
    // must switch each node's visited flag back to false
    this.clearVisitedFlags();
  }

  breadthFirstSearch(callBack) {
    callBack = callBack || ((node) => console.log(`visiting ${node.id}`));
    if (!this.nodes.length) {
      return;
    }
    this.nodes.forEach((node) => {
      if (node.visited) {
        return;
      }
      let queue = [node];
      while (queue.length) {
        const currentNode = queue.shift();
        callBack(currentNode);
        currentNode.visited = true;
        const adjNodes = currentNode.connectedNodeIDs().map((id) => {
          return this.nodes[id];
        });
        const unVisitedAdjNodes = adjNodes.filter(node => !node.visited);
        queue = queue.concat(unVisitedAdjNodes);
      }
    });
    this.nodes;
    this.clearVisitedFlags();
  }

  areConnectedBreadthFirst(nodeID1, nodeID2) {
    const node1 = this.nodes[nodeID1];
    const node2 = this.nodes[nodeID2];
    const search = (node) => {
      if (node && node2 && node === node2) {
        return true;
      }
      node.visited = true;
      const adjNodes = node.connectedNodeIDs().map((id) => {
        return this.nodes[id];
      });
      const unVisitedAdjNodes = adjNodes.filter(node => !node.visited);
      return unVisitedAdjNodes.some((node) => {
        return search(node);
      });
    };
    const foundConnection = search(node1);
    this.clearVisitedFlags();
    return foundConnection;
  }

  addBunchEdge(edges) {
    edges.forEach((edgeArr) => {
      let fromID = edgeArr[0];
      let toID = edgeArr[1];
      this.addEdge(fromID, toID);
    });
  }
}

class Node {
  constructor(id, optEdges=[], value) {
    this.id = id;
    this.value = value || id;
    this.visited = false;
    this.edges = optEdges.reduce((edgesRecord, nodeId) => {
      edgesRecord[nodeId] = true;
      return edgesRecord;
    }, {});
  }
  // edges is an array of vertex ids
  showEdges() {
    return Object.keys(this.edges);
  }

  connectedNodeIDs() {
    return Object.keys(this.edges)
    .map((IDStr) => {
      return IDStr;
    });
  }
}


/*
   Build Order: You are given a list of projects and a list of dependencies
   (which is a list of pairs of projects, where the second project is dependent
   on the first project). All of a project's dependencies must be built before
   the project is. Find a build order that will allow the projects to be built.
   If there is no valid build order, return an error.
   input:
   tasks a, b, c, d, e, f
   dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
   Output: f, e, a, b, d, c

   input an array of tasks
   and an 2d array dependencies
   output a array of how tasks can be arrange to be completed

   make graph with tasks array
   then make edges with dependencies array, all edges should be directed
   then depth first search or breadth first search edges and enter each node
   into array as you traverse through them
   any time you find a node that has been searched, return false due to
   circularity else return that array

   what is a b c have to be completed before d?
   maybe should go backward from d to a b c and the edges are direct form
   d to a b c

   and as long as there is no circularity with one tree then it is good
   then move on to next tree but then it could be connected to another
   already traversed tree

   how about maintain a record for each tree as well
   if node is found in it then there is circularity
   if a node has been searched, ignore it

   time and space: going through tasks array: n
   going through dependencies: d
   then
 */

/*
   make graph
   add edges
   search and add searched and inProgress to each node
     remove inProgress as recursion return
   unMarkAfterSearch()

*/

let makeGraph = function(taskArray) {
  let graph = new UndirectedGraph();
  return taskArray.reduce((graphRecord, task) => {
    let node = graphRecord.graph.addNodeWithValue(task);
    graphRecord.nodeIDs[task] = node.id;
    return graphRecord;
  }, {graph: graph, nodeIDs: {}});
};

let makeEdgesInIDs = function(edgesArray, nodeIDs) {
  return edgesArray.map((edgeArr) => {
    let [fromVal, toVal] = edgeArr;
    return [nodeIDs[fromVal], nodeIDs[toVal]];
  });
};

let toHierarchyArray = function(graph) {
};

let buildOrder = function(tasks, dependencies) {
  let {graph, nodeIDs} = makeGraph(tasks);

  dependencies = makeEdgesInIDs(dependencies, nodeIDs);

  graph.addBunchEdge(dependencies);

  return toHierarchyArray(graph);
};
