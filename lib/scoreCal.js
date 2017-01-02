// 0.169152321 seconds time elapsed
'use strict';

module.exports = function scoreCal (allSets, next) {
	/**
	 * parameters expected in the args:
	 * allSets (array)
	 **/

	var currentTime = Math.round(Date.now() / 1000);
	var result = {};
	
	if (Object.keys(allSets).length == 0) {
		return result;
	}
	
	// forEach's faster than .map or .every
	allSets.forEach(function(keywordSet) {
		var timeDiff = currentTime - Math.round(keywordSet.timestamp);
		// Note: If keywords.length is big, .toFixed(4) now, not last.
		var score = 1 / (timeDiff / 86400 / 30);
		//~ var score = Number( (1 / (timeDiff / 86400 / 30)).toFixed(4) );
		
		keywordSet.keywords.forEach(function(keyword) {
			
			result[keyword] = result[keyword] ? result[keyword] + score : score ;
		});
		
	});
	
	// Note: If keywords.length is big, .toFixed(4) earlier, not here.
	Object.keys(result).forEach(function(keyword) {
		result[keyword] = Number(result[keyword].toFixed(4));
	});
	
	if ('function' === typeof next) {
		next(result);
	} else {
		return result;
	}
}
