// given an array of numbers and a target number
// find a combo of two numbers to sum up to the target
// let arr = [1,2,3,4,7];
// target = 8
// should return null
// 
// let arr = [1,2,3,4,4,9];
// target = 8
// should return [4,4];
// 
// let arr = [1,2,3,4,6,7];
// target = 8
// should return [2,6];

let findCombo = (arr, target) => {
  let numFreq = arr.reduce((freqObj, num) => {
    if (freqObj[num]) {
      freqObj[num]++;
    } else {
      freqObj[num] = 1;
      freqObj.uniq.push(num);
    }
    return freqObj;
  }, {uniq:[]});

  //loop through the uniq array of number just in case there are many duplicated numbers
  for (let i = 0; i < numFreq.uniq.length; i++){
    let curNum = numFreq.uniq[i];
    let combRecord = {};
    combRecord[curNum] = 1;

    let neededNum = target - curNum;
    if (numFreq[neededNum]) {
      combRecord[neededNum] = (combRecord[neededNum] || 0) + 1;
      //now check and see if there are enough of each numbers in the numFreq to create this combRecord:
      let combArr = Object.keys(combRecord).map( (num) => {return +num;});
      let eachNumHasEnoughAmount = combArr.every( (num) => {
        return numFreq[num] >= combRecord[num];
      });
      if (eachNumHasEnoughAmount) {
        //expend the combArr in case two of the same numbers are needed
        //like: {4: 2} then expended array should be: [4, 4];
        return combArr.reduce( (finalArr, num) => {
          //create a new array of the same length as the value found in combRecord
          //then fill that array with the same num
          return finalArr.concat(Array(combRecord[num]).fill(num));
        }, []);
      }
    }
  }
  return null;
};

// let arr = [1,2,3,4,9];
// let target = 8
// should return null
// 
// let arr = [1,2,3,4,4,9];
// let target = 8
// should return [4,4];
// 
let arr = [1,2,3,4,6,9];
let target = 8;
// should return [2,6];
findCombo(arr, target);



//for every number in arr: save their pairing num in a cache
//if later on that pairing num is found in the arr
//  return them
//  
//save needed/required info in a cache instead of immediately trying resolve them
//them one by one looping through the array, then check current element against the cache
//  
//  
function findCombo002(target, arr) {
  var cache = {};
  for (var i = 0; i < arr.length; i++){
    if (cache[arr[i]]) {
      return [target-arr[i], arr[i]];
    } else {
      cache[target - arr[i]] = true;
    }
  }
  return [];
}

console.log(findCombo002(10, [9, 2, 4, 6, 1]));
