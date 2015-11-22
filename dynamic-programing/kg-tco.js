function tco(f) {
  /**
  Takes `f` function and returns wrapper in return, that may be
  used for tail recursive algorithms. Note that returned funciton
  is not side effect free and should not be called from anywhere
  else during tail recursion. In other words if
  `var f = tco(function foo() { ... bar() ... })`, then `bar`
  should never call `f`. It is ok though for `bar` to call `tco(foo)`
  instead.
  ## Examples
  var sum = tco(function(x, y) {
    return y > 0 ? sum(x + 1, y - 1) :
           y < 0 ? sum(x - 1, y + 1) :
           x
  })
  sum(20, 100000) // => 100020
  **/

  var value, active = false, accumulated = []
  return function accumulator() {
    console.log(accumulated);
    // Every time accumulator is called, given set of parameters
    // are accumulated.
    accumulated.push(arguments)
    // If accumulator is inactive (is not in the process of
    // tail recursion) activate and start accumulating parameters.
    if (!active) {
      active = true
      // If wrapped `f` performs tail call, then new set of parameters will
      // be accumulated causing new iteration in the loop. If `f` does not
      // performs tail call then accumulation is finished and `value` will
      // be returned. 
      while (accumulated.length) value = f.apply(this, accumulated.shift())
      active = false
      return value
    }
  }
}

var getCandyForThisIndex = function(score, result, index) {
    // console.log(index);
    // console.log(score);
    // console.log(result);
        var cIndex = index;
        var lIndex = index - 1;
        var rIndex = index + 1;
        var lValue = score[index - 1];
        var cValue = score[index];
        var rValue = score[index + 1];

        if (cValue < lValue && cValue < rValue) { //6,1,7
            return 1;
        }

        if (cValue <= lValue && cValue > rValue) { //5,4,3
            if (result[rIndex] == 0) {
                result[rIndex] = getCandyForThisIndex(score, result, rIndex);
            }
            return 1 + result[rIndex];
        }

        if (cValue > lValue && cValue <= rValue) { //3,4,5
            if (result[lIndex] == 0) {
                result[lIndex] = getCandyForThisIndex(score, result, lIndex);
            }
            return 1 + result[lIndex];
        }

        if (cValue > lValue && cValue > rValue) { //2,5,3
            debugger;
            if (result[lIndex] == 0) {
                result[lIndex] = getCandyForThisIndex(score, result, lIndex);
            }
            if (result[rIndex] == 0) {
                result[rIndex] = getCandyForThisIndex(score, result, rIndex);
            }
            return 1 + (result[lIndex] > result[rIndex] ? result[lIndex] : result[rIndex]);
        }

        return 0;
}

function processData(input) {
    //hacker rank input
    // var arr = input.replace(/\n/g, " ").split(" ");
    // var score = [];
    // var result = [];
    // for (var i = 1; i < arr.length; i++) {
    //     score.push(Number(arr[i]));
    //     result.push(0);
    // }

    var score = [];
    var result = [];
    for (var i = 0; i < input; i++) {
        score.push(Math.floor(Math.random()*100000));
        result.push(0);
    }
    console.log(score);

    var totalCandy = 0;

    //for the first one
    if (score[0] <= score[1]) { //2,4
        result[0] = 1;
    } else { //4,2
        result[0] = getCandyForThisIndex(score, result, 1) + 1;
    }

    //for the last one
    if (score[score.length - 1] <= score[score.length - 2]) { //2,1
        result[score.length - 1] = 1;
    } else { //1,2
        result[score.length - 1] = getCandyForThisIndex(score, result, score.length - 2) + 1;
    }


//console.log(result);
    for (var i = 1; i < score.length - 1; i++) {
        if (result[i] == 0) {
            result[i] = getCandyForThisIndex(score, result, i);
        }
    }

    for (var k = 0; k < result.length; k++) {
        totalCandy += result[k];
    }
    console.log(result);
    return totalCandy;
}