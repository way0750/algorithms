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

  depthFirstSearch() {
    const search = (node) => {
      if (node.visited) {
        console.log(`${node.id} has been visited`);
        return;
      }
      node.visited = true;
      node.edges.forEach((bool, id) => {
        const node = this.nodes[id];
        if (node) {
          search(node);
        }
      });
      console.log(`visiting: ${node.id}`);
    };
    this.nodes.forEach((node) => {
      search(node);
    });

    // must switch each node's visited flag back to false
    this.nodes.forEach((node) => {
      node.visited = false;
    })
  }

  breadthFirstSearch() {
    // use a queue again
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
        if (currentNode.visited) {
          console.log(`already visited this node: ${currentNode.id}`)
        } else {
          console.log(`currentNode is ${currentNode.id}`);
          currentNode.visited = true;
          const adjNodes = currentNode.edges.reduce((connectedNodes, connected, id) => {
            return connected ? connectedNodes.concat(this.nodes[id]) : [];
          }, []);
          queue = queue.concat(adjNodes);
        }
      }
    });
  }
}

class Node {
  constructor(id, optEdges) {
    this.id = id;
    this.visited = false;
    this.edges = [];
    optEdges.forEach((nodeId) => {
      this.edges[nodeId] = true;
    })
  }
  // edges is an array of vertex ids
  showEdges() {
    return this.edges.slice();
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
graph.addNode(0);
// 13
graph.addNode(0);
// 14
graph.addNode(0);

graph.breadthFirstSearch();
