var
	http = require('http'),
	url = require('url'),
	fs = require('fs');

function createRouter(basePath) {

	function notFound(res, url) {

		res.end(url + ' not found', 404);
	}

	return function (req, res) {

		var urlParts = url.parse(req.url)	;

		fs.readFile(basePath + '/' + urlParts.pathname, function (err, data) {

			if (err) {
				switch(err.code) {
					case 'ENOENT':
						return notFound(res, req.url);
				}
			}

			res.writeHead(200, {
				'Content-Length': data.length,
				'Content-Type': 'text/plain' });

			res.end(data);
		});
	};
}

http.createServer(createRouter('./www')).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');