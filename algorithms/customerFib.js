// one pair of rabbit:
// takes 1 month to reach reproductive age and then mate every single month there on
// each month can produce 3 pair of rabbits
// so first month simply 
// 1: {1: 1} total: 1
// 2: {1: 1(just mated)}: still 1
// 3: {1: 1 + 3 new}: 1 + 3 = 4
// 4: {1: 1 + 3 new} {3: 3(born last round and now mated)} 4 + 3 = 7
// 5: {1: 1 + 3 new} {3: 3(born last round and now mated)} {3: 3 + 3 * 3} = 19
// 
// so it goes like this from generation 1 to 5th
// 1 1 4 7 19
// basically a Fibonacci problem: 19 = 4 * 3 + 7 meaning 4 pairs from 3rd generations can reproduce now thats why * 3
// 4 * 3 = all the new rabbits
// but you have to also add the all the existing ones regardless whether if they reproduce
// 4 + 7 = 19;
// 
// the usual Fibonacci accelerate by f1 * 1 + f2
// in this case it is f1 * 3 + f2
// 
// generation 0 return 0
// generation 1 return 1
// generation 2 : g0 * 3 + g1: 1
// generation 3 : g1 * 3 + g2: 4
// generation 4 : g2 * 3 + g3: 7
// generation 5 : g3 * 3 + g4: 19 
//
//
//
// 5 months and each pair can produce 3 pair
//
//
// 1, 1, 1 + 1*3 = 4, 1 + 1*3 + 3 = 7, 
// (1 + 3) + (3) + (3 + 3*3) = 4 + 3 + 3 + 9 = 19
//
// 1, 1, 4, 7, 19
// 0 1 1 4 7 19
// 0*3+1 = 1
// 1*3+1 = 4
// 1*3+4 = 7
// 4*3+7 = 19
// 
// generation 0 return 0
// generation 1 return 1
// generation 2 : g0 * 3 + g1: 1
// generation 3 : g1 * 3 + g2: 4
// generation 4 : g2 * 3 + g3: 7
// generation 5 : g3 * 3 + g4: 19

let customerFib = (round, acceleration) => {
  if (round === 0 || round === 1){
    return round;
  }
  let f1 = 0, f2 = 1, f3 = f1 * acceleration + f2;
  for (let i = 2; i < round; i++){
    f1 = f2;
    f2 = f3;
    f3 = f1 * acceleration + f2;
  }
  return f3;
};

customerFib(5, 3); // 19;


let customerFibRecursive = (round, acceleration) => {
  let memo = {};
  let calculFib = (round) => {
    //base case: when round === 0 or 1, return round;
  if (round === 0 || round === 1){
    return round;
  }
  let f1 = round - 2;
  memo[f1] = memo[f1] === undefined ? calculFib(f1) : memo[f1];
  let f2 = round - 1;
  memo[f2] = memo[f2] === undefined ? calculFib(f2) : memo[f2];
  return memo[f1] * acceleration + memo[f2];
  };

  return calculFib(round);
};

customerFibRecursive(5, 3); // 19

