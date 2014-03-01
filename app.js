var http = require('http');
var url = require('url');

http.createServer(function(request, response) {
	try {
		var code = url.parse(request.url, true).query.code;
		response.end(code ? '' + eval(code) : 'All right');
	} catch (error) {
		response.end(error.stack);
	}
}).listen(7777);