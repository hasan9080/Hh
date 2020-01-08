var http = require('http');

var handleRequest = function(request, response) {
  console.log('URL 요청을 받았습니다 ' + request.url);
  response.writeHead(200);
  response.end('안녕 세상');
};
var www = http.createServer(handleRequest);
www.listen(8080);
