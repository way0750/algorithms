/*
Highway Billboard Problem
Consider a highway of M miles. The task is to place billboards on the highway
   such that revenue is maximized. The possible sites for billboards are given
   by number x1 < x2 < ….. < xn-1 < xn, specifying positions in miles measured
   from one end of the road. If we place a billboard at position xi, we receive
   a revenue of ri > 0. There is a restriction that no two billboards can be
   placed within t miles or less than it.

Note : All possible sites from x1 to xn are in range from 0 to M as need to
   place billboards on a highway of M miles.

Examples:

Input : M = 20
        x[]       = {6, 7, 12, 13, 14}
        revenue[] = {5, 6, 5,  3,  1}
        t = 5
Output: 10
By placing two billboards at 6 miles and 12
miles will produce the maximum revenue of 10.

Input : M = 15
        x[] = {6, 9, 12, 14}
        revenue[] = {5, 6, 3, 7}
        t = 2
Output : 18
   optimal substructure and overlapping sub-problems.
   use dynamic programming because the problem or part of it can be linearly
   reduced/solves by smaller parts, and those results can be reused(overlapping)

   build cases: from 0 to 15
   solve each problem:
     if case is not found in the positions, just use the current max
     if the case is found: use it to find $,
       self value + (position - t -1): old result
       compare this result vs current max, take the largest
     save result in table num: result

   return currentMax
*/

let highWayBillboards = function(length, pos, revenue, limit) {
  limit++; // right at limit isn't good enough, has to be further
  let posRevenueTable = revenue.reduce((table, revenue, index) => {
    table[pos[index]] = revenue;
    return table;
  }, {});
  let lengthRevenueTable = {};
  let currentMax = 0;
  for (let mile = 0; mile <= length; mile++) {
    // if there isn't a revenue for this position, then no need to
    // find what is highest revenue, just reuse the previous max
    if(!posRevenueTable.hasOwnProperty(mile)) {
      lengthRevenueTable[mile] = currentMax;
    } else {
      let otherRevenue = lengthRevenueTable[ mile - limit ] || 0;
      otherRevenue += posRevenueTable[mile];
      currentMax = Math.max(currentMax, otherRevenue);
      lengthRevenueTable[mile] = currentMax;
    }
  }

  return currentMax;
}
