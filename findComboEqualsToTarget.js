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
