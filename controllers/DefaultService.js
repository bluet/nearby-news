'use strict';
var r = require('rethinkdbdash')({
	db: 'nearby_news',
	host: 'localhost'
});
var scoreCal = require(__dirname + '/../lib/scoreCal.js');


exports.findCategory = function(args, res, next) {
	/**
	 * parameters expected in the args:
	* latitude (Float)
	* longitude (Float)
	* radius (Float)
	**/
	
	r.table('news_entry')
		.getIntersecting(
			r.circle(
				[args.longitude.value, args.latitude.value],
				args.radius.value,
				{unit: "km"}
			),
			{index: "location"}
		)
		.withFields('category')
		.concatMap( function(entry) { return entry('category') } )
		.distinct()
		.run()
		.then(function(entries) {
			//~ res.setHeader('Access-Control-Allow-Origin', '*');
			//~ res.setHeader('Access-Control-Allow-Credentials', 'true');
			//~ res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(entries));
		})
		.error( function(){ res.end(); } );
	
}

exports.findKeyword = function(args, res, next) {
	/**
	 * parameters expected in the args:
	* latitude (Float)
	* longitude (Float)
	* radius (Float)
	**/
	
	// FIXME: Keyword Score is needed
	r.table('news_entry')
		.getIntersecting(
			r.circle(
				[args.longitude.value, args.latitude.value],
				args.radius.value,
				{unit: "km"}
			),
			{index: "location"}
		)
		//~ .withFields('keywords', 'location', 'timestamp')
		.withFields('keywords', 'timestamp')
		//~ .concatMap( function(entry) { return entry('keywords') } )
		//~ .distinct()
		.map(function (entry) {
			return entry.merge({timestamp: entry('timestamp').toEpochTime()});
		})
		.run()
		.then(function(entries) {
			//~ res.setHeader('Access-Control-Allow-Origin', '*');
			//~ res.setHeader('Access-Control-Allow-Credentials', 'true');
			//~ res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
			res.setHeader('Content-Type', 'application/json');
			//~ res.end(JSON.stringify(entries));
			//~ console.log(entries);
			res.end(JSON.stringify( scoreCal(entries) ));
		})
		.error( function(){ res.end(); } );
	
	
}

exports.findNews = function(args, res, next) {
	/**
	 * parameters expected in the args:
	* latitude (Float)
	* longitude (Float)
	* radius (Float)
	**/
	
	console.log("findNews: ARGS: ");
	console.log(args);
	
	r.table('news_entry')
		.getIntersecting(
			r.circle(
				[args.longitude.value, args.latitude.value],
				args.radius.value,
				{unit: "km"}
			),
			{index: "location"}
		)
		.run()
		.then(function(entries) {
			var result = {};
			result['application/json'] = entries;
			if(Object.keys(result).length > 0) {
				//~ res.setHeader('Access-Control-Allow-Origin', '*');
				//~ res.setHeader('Access-Control-Allow-Credentials', 'true');
				//~ res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify(result[Object.keys(result)[0]] || {}, null, 2));
			}
			else {
				res.end();
			}
		})
		.error(function(){res.end();});
	
}

exports.findNewsByCategory = function(args, res, next) {
	/**
	 * parameters expected in the args:
	* category (String)
	* latitude (Float)
	* longitude (Float)
	* radius (Float)
	**/
	
	r.table('news_entry')
		.getIntersecting(
			r.circle(
				[args.longitude.value, args.latitude.value],
				args.radius.value,
				{unit: "km"}
			),
			{index: "location"}
		)
		.filter(function(entry) {
			return entry("category").contains(args.category.value)
		})
		.run()
		.then(function(entries) {
			//~ res.setHeader('Access-Control-Allow-Origin', '*');
			//~ res.setHeader('Access-Control-Allow-Credentials', 'true');
			//~ res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(entries));
		})
		.error(function(){res.end();});
	
}

exports.findNewsByKeyword = function(args, res, next) {
	/**
	 * parameters expected in the args:
	* keyword (String)
	* latitude (Float)
	* longitude (Float)
	* radius (Float)
	**/
	r.table('news_entry')
		.getIntersecting(
			r.circle(
				[args.longitude.value, args.latitude.value],
				args.radius.value,
				{unit: "km"}
			),
			{index: "location"}
		)
		.filter(function(entry) {
			return entry("keywords").contains(args.keyword.value)
		})
		.run()
		.then(function(entries) {
			//~ res.setHeader('Access-Control-Allow-Origin', '*');
			//~ res.setHeader('Access-Control-Allow-Credentials', 'true');
			//~ res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(entries));
		})
		.error(function(){res.end();});
	
}


exports.findNewsById = function(args, res, next) {
	/**
	 * parameters expected in the args:
	* id (Long)
	**/
	r.table('news_entry')
		.get(args.id.value)
		.run()
		.then(function(entries) {
			//~ res.setHeader('Access-Control-Allow-Origin', '*');
			//~ res.setHeader('Access-Control-Allow-Credentials', 'true');
			//~ res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT');
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(entries));
		})
		.error(function(){res.end();});
	
}
