function dst(score) {
    //hacker rank input
    // var arr = input.replace( /\n/g, " " ).split( " " );
    // var score = [];
    // for(var i=1;i<arr.length;i++){
    //     score.push(Number(arr[i]));
    // }

    var totalCandy = 0;
    var result = Array.apply(null, Array(score.length)).map(Number.prototype.valueOf,0);;

    //for the first one
    if(score[0] <= score[1]){//2,4
        result[0] = 1;
    }else{//4,2
        result[0] = getCandyForThisIndex(score, result, 1) + 1;
    }

    //for the last one
    if(score[score.length-1] <= score[score.length-2]){//2,1
        result[score.length-1] = 1;
    }else{//1,2
        result[score.length-1] = getCandyForThisIndex(score, result, score.length-2) + 1;
    }

    for (var i = 1; i < score.length-1; i++) {
        if(result[i] == 0){
            result[i] = getCandyForThisIndex(score, result, i);
        }
    }

    for (var k = 0; k < result.length; k++) {
        totalCandy += result[k];
    }
    console.log(result)
    return totalCandy;
}

function getCandyForThisIndex(score, result, index) {
    var cIndex = index;
    var lIndex = index - 1;
    var rIndex = index + 1;
    var lValue = score[index - 1];
    var cValue = score[index];
    var rValue = score[index + 1];

    if (cValue <= lValue && cValue <= rValue) { //6,1,7 or 6,6,6
        return 1;
    } else if (cValue <= lValue && cValue > rValue) { //5,4,3
        if (result[rIndex] == 0) {
            result[rIndex] = getCandyForThisIndex(score, result, rIndex);
        }
        return result[rIndex] + 1;
    } else if (cValue > lValue && cValue <= rValue) { //3,4,5
        if (result[lIndex] == 0) {
            result[lIndex] = getCandyForThisIndex(score, result, lIndex);
        }
        return result[lIndex] + 1;
    } else if (cValue > lValue && cValue > rValue) { //2,5,3
        if (result[lIndex] == 0) {
            result[lIndex] = getCandyForThisIndex(score, result, lIndex);
        }
        if (result[rIndex] == 0) {
            result[rIndex] = getCandyForThisIndex(score, result, rIndex);
        }
        return (result[lIndex] > result[rIndex] ? result[lIndex] : result[rIndex]) + 1;
    } else {
        return 0;
    }
}

//[2, 4, 2, 6, 1, 7, 8, 9, 2, 1] = 19
//[1, 2, 2]  = 4
//score is an array of marks ...teacher wants to give candy to each student.If two adjacent students then 
//students with higher marks will get more candy than previous one. Find the minimum number of candies ?
