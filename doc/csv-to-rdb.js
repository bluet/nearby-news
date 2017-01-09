var csv = require("fast-csv");
var r = require('rethinkdbdash')({
	db: 'nearby_news',
	host: 'localhost'
});

csv
	.fromPath("Newsmap.csv")
	.on("data", function(data){
		var time_str = data[2];
		time_str = time_str.replace(' ', "T");
		time_str += '+08:00';
		var entry = {
			id: parseInt(data[0]),
			title: data[6],
			location: r.point(parseFloat(data[4]), parseFloat(data[3])),
			//~ location: [parseFloat(data[4]), parseFloat(data[3])],
			keywords: data.slice(8, data.length-1),
			timestamp: r.ISO8601(time_str),
			//~ timestamp: time_str,
			source: data[7],
			source_site: data[5],
			category: [data[1]],
			positive: null
		};
		//~ console.log(data);
		console.log(entry);
		r.table('news_entry').insert(entry).run();
	})
	.on("end", function(){
		console.log("done");
	});
