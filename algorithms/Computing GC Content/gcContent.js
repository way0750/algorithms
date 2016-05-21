let fs = require('fs');
let str = fs.readFileSync('./rosalind_gc.txt', 'utf8');

let entries = str.match(/>[^>]+/g);

let getGc = (str) => {
  let gcAmount = str.match(/[gc]/ig).length;
  return gcAmount / str.length * 100;
};

entries = entries.map( (str) => {
  let strComponents = str.split('\n');
  let id = strComponents.splice(0, 1)[0];
  id = id.replace('>', '');
  let content = strComponents.join('');
  content = content.replace('\n', '');
  return {id: id, gCAmount: getGc(content)};
});

let gcContent = (arr) => {
  let maxGC =  arr.reduce( (curMaxObj, gcObj) => {
    return curMaxObj.gCAmount > gcObj.gCAmount ? curMaxObj : gcObj;
  });
  return maxGC.id + '\n' + maxGC.gCAmount;
};
