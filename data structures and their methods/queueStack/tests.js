chai.should();
describe('Stack', function() {
  let q = new Queue();
  q.push(1);
  q.push(4);
  q.push(8);
  q.push(5);
  q.push(2);
  q.push(0);
  q.push(3);
  q.push(7);

  let stack = new Stack()
  stack.push(8);
  stack.push(9);
  stack.push(7);
  stack.push(9);
  stack.push(5);
  stack.push(8);
  stack.push(3);
  stack.push(9);
  stack.push(3);
  stack.push(3);
  stack.push(3);
  stack.push(8);

  it('getting mins', function() {
    let result = [8,8,7,7,5,5,3,3,3,3,3,3];
    stack.min().should.equal(result[result.length - 1]);
    stack.pop();
    result.pop();
    stack.min().should.equal(result[result.length - 1]);
    stack.pop();
    result.pop();
    stack.min().should.equal(result[result.length - 1]);
    stack.pop();
    result.pop();
    stack.min().should.equal(result[result.length - 1]);
    stack.pop();
    result.pop();
  });

  it('SetOfStacks pushing works', function() {
    let set = new SetOfStacks(3);
    set.push(1);
    set.push(2);
    set.push(3);
    set.push(4);
    set.push(5);
    set.push(6);
    set.push(3);
    Object.keys(set.storage).length.should.equal(3);
    set.size.should.equal(7)
  })

  it('SetOfStacks poping works', function() {
    let set = new SetOfStacks(3);
    set.push(1);
    set.push(2);
    set.push(3);
    set.push(4);
    set.push(5);
    set.push(6);
    set.push(3);

    set.pop()
    set.size.should.equal(6)
    set.pop();
    set.size.should.equal(5)
    set.subStackIndex.should.equal(1)

    let set2 = new SetOfStacks(3);
    (set2.pop() === undefined).should.be.true
  });

  it('SetOfStacks popAt works', function() {
    let set = new SetOfStacks(2);
    set.push(1);
    set.push(2);
    set.push(3);
    set.push(4);
    set.push(5);
    set.push(6);
    set.push(3);
    set.popAt(2).should.equal(6)
    set.popAt(2).should.equal(5)
    set.pop();
    set.pop().should.equal(4)
    set.size.should.equal(3)

  });
});
