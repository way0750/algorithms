/*
   most if not all the set up things go here
*/
chai.should();

let QuickTest = () => {
  let testID = 1;

  this.qt = function(arg1, arg2) {
    let testName = `Test Number: ${testID++}`;
    let callBack;
    if (typeof arg1 === 'string') {
      testName = arg1;
      callBack = arg2
    } else if (typeof arg1 === 'function') {
      callBack = arg1;
    } else {
      callBack = () => {
        ('Did you provide a callBack function?').should.to.be.true
      }
    }
    it(testName, callBack);
  }

  this.xqt = function(arg1) {
    let testName = typeof arg1 === 'string' ? arg1 : `Test Number: ${testID++}`;
    xit(testName, () => {});
  }
}

QuickTest();
