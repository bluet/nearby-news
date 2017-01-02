// 0.169152321 seconds time elapsed

//read the JSON file
var fs = require('fs');
var rawObj = JSON.parse(fs.readFileSync('testfile.json', 'utf8'));
var currentTime = Math.round(Date.now() / 1000);
var result = {};

// forEach's faster than .map or .every
rawObj.forEach(function(keywordSet) {
	var timeDiff = currentTime - Math.round(keywordSet.timestamp);
	
	// Note: If keywords.length is big, .toFixed(4) now, not last.
	var score = 1 / (timeDiff / 86400 / 30);
	//~ var score = Number( (1 / (timeDiff / 86400 / 30)).toFixed(4) );
	
	// forEach's faster than .map or .every
	keywordSet.keywords.forEach(function(keyword) {
		
		result[keyword] = result[keyword] ? result[keyword] + score : score ;
	});
	
});

// Note: If keywords.length is big, .toFixed(4) earlier, not here.
Object.keys(result).forEach(function(keyword) {
	result[keyword] = Number(result[keyword].toFixed(4));
});

//~ console.log(result);
