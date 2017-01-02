// 0.169152321 seconds time elapsed

var scoreCal = require(__dirname + '/../lib/scoreCal.js');
//read the JSON file
var fs = require('fs');
var input = JSON.parse(fs.readFileSync('t/data/scoreCal.input.json', 'utf8'));

var keywordScore = scoreCal(input);

console.log(keywordScore);
