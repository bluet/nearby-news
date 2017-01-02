//read the JSON file
var fs = require('fs');
var rawObj = JSON.parse(fs.readFileSync('testfile.json', 'utf8'));
var currentTime = Math.floor(Date.now() / 1000);
var middleObj = [];
var targetObj = [];

// score calculation
function calculateScore(timeDiff) {
  return 1 / (timeDiff / 86400 / 30);
}

//transfer the raw object to the middle object
for (var i = 0; i < rawObj.length; i++) {
  for(var j = 0; j < rawObj[i].keywords.length; j++) {
    middleObj.push({"keywords":rawObj[i].keywords[j], "timestamp":rawObj[i].timestamp});
  }
}

//transfer the miidle object to the target object
for (var i = 0; i < middleObj.length; i++) {
  var timeDiff = Math.floor(currentTime - middleObj[i].timestamp);
  const index = targetObj.findIndex(item => item.name === middleObj[i].keywords); // If keywords were not found in target object, push it. Otherwise, re-caculate the score of the keyword
  if (index === -1) {
    targetObj.push({"name":middleObj[i].keywords, "score": calculateScore(timeDiff)});
  }
  else {
    targetObj[index].score += calculateScore(timeDiff);
  }
}
console.log(targetObj);
