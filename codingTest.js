/*
   stock market
   make that money no matter up or down
   get two consective dates, then sort them low high
   high / low = growth
   mutiply the last one and done
*/

let buyStock = (arr, startAmount) => {
  let prot = 1;
  let profit = 0;
  for (let i = 1; i < arr.length; i++) {
    let [low, high] = [arr[i], arr[i-1]].sort((n1, n2) => n1 >= n2);
    let diff = high/low;
    prot *= diff;
    profit += (startAmount * diff)
  }
  return profit;
}

it('works?', function() {
  let arr= [3,1,2];
  buyStock(arr).should.equal(6);
})

let apple = [
  1,
  6,
  9.22,
  28,
  17.46,
  24.62,
  12.94,
  77.88,
  90.53,
  75.77,
  100.01,
  75.38,
  83.61,
  75.29,
  62,61,
  65,55,
  64,
  56,71,
  71,76,
  66.77,
  80,
  71.51,
  74.99,
  118.93,
  105.99,
  129.5,
  105.76,
  121.06,
  96.96,
  101.42,
  94.02,
  108.66,
  90.52,
  98.83,
  93.40,
  108.18,
  103.13,
  116.6,
  108.84,
  139.78,
]
console.log(buyStock(apple, 27000));
