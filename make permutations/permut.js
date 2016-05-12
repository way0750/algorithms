let fs = require('fs');

// input a number which specifies the amount of elements that need to permute;
// out a number of the amount of permutations;
// then all the permutations;
// 3 return [3];
// then 2 + 3 [2,3];
// move 2 to next index [3,2];
// add 1 to [2, 3];
// 1 2 3, 2 1 3, 2 3 1;
// add 1 to [3, 2];
// 1 3 2, 3 1 2, 3 2 1;




let permute = (length) => {
  let arr = [];
  while (length){
    arr.unshift(length.toString());
    length--;
  }

  let makePermutation = (arr) => {
    
    if (arr.length < 2) {
      return [arr];
    }
    
    let curNum = arr[0];
    let subPermutations = makePermutation(arr.slice(1));
    console.log(subPermutations);
    return subPermutations.reduce( (finalPermu, arr) => {
      for (let i = 0; i <= arr.length; i++){
        finalPermu.push(arr.slice(0, i).concat(curNum, arr.slice(i)));
      }
      return finalPermu;
    }, []);

  };

  let allPermutations = makePermutation(arr);
  let finalStr = allPermutations.reduce( (finalStr, arr) => {
    return finalStr += (arr.join(' ') + '\n');
  }, "");
  return allPermutations.length + '\n' + finalStr;

};

let seven = permute(7);

fs.writeFileSync('./output.txt', seven);
