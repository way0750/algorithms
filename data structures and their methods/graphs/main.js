class UndirectedGraph {
  constructor() {
    this.nextNodeId = 0;
    this.nodes = [];
  }
  showNodes() {
    // return a copy of all nodes
    return this.nodes.slice();
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
  addEdge(nodeID1, nodeID2) {
    const node1 = this.nodes[nodeID1];
    const node2 = this.nodes[nodeID2];
    if (node1 && node2) {
      node1.edges[nodeID2] = true;
      node2.edges[nodeID1] = true;
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
    this.clearVisitedFlags();
  }

  areConnectedBreadthFirst(nodeID1, nodeID2) {
    const node1 = this.nodes[nodeID1];
    const node2 = this.nodes[nodeID2];
    const search = (node) => {
      if (node === node2) {
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
}

class Node {
  constructor(id, optEdges) {
    this.id = id;
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

var graph = new UndirectedGraph();
// 0
graph.addNode();
// 1
graph.addNode(0);
// 2
graph.addNode(0);
// 3
graph.addNode(1);
// 4
graph.addNode(1);
// 5
graph.addNode(1);
// 6
graph.addNode(1);
// 7
graph.addNode(1);
// 8
graph.addNode(2);
// 9
graph.addNode(2);
// 10
graph.addNode(2);
// 11
graph.addNode(2);
// 12
graph.addNode();
// 13
graph.addNode();
// 14
graph.addNode();

console.log(graph.areConnectedBreadthFirst(0, 13));
