chai.should();
chai.expect();

describe('Describe a topic, an area of tests. Can be nested', function() {
  var graph;
  beforeEach(function() {
    graph = new UndirectedGraph();
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

  })

  it('graph, does it work?', function() {
    //console.log(graph.nodes);
  });

  it('depthFirstSearch should go through every node', function() {
    const nodes = graph.nodes.slice()
    graph.depthFirstSearch((node) => {
      delete nodes[node.id];
    });
    nodes.join('').should.be.equal('');
  });

  it('breadthFirstSearch should go through every node', function() {
    const nodes = graph.nodes.slice()
    graph.breadthFirstSearch((node) => {
      delete nodes[node.id];
    });
    nodes.join('').should.be.equal('');
  });

  it('areConnectedBreadthFirst, 0 and 14 are not connect, 0 and 7 are', function() {
    const first = graph.areConnectedBreadthFirst(0, 14);
    const second = graph.areConnectedBreadthFirst(0, 7);
    first.should.equal(false);
    second.should.equal(true);
  })

});

describe('buildOrder', function() {
  it('buildOrder works without circularity', function() {
    let tasks = ['a', 'b', 'c', 'd', 'e', 'f'];
    // (a, d), (f, b), (b, d), (f, a), (d, c)
    let dependencies = [['a', 'd'], ['f', 'b'], ['b', 'd'], ['f', 'a'], ['d', 'c']];
    let order = buildOrder(tasks, dependencies);
    let result = [ 'f', 'e', 'b', 'a', 'd', 'c' ];
    order.should.deep.equal(result)
  });

});
