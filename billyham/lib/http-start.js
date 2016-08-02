const http = require('http');

function startServer (requestListener, port){
  var server = http.createServer(requestListener);
  return server.listen.apply(server, [port]);

}

module.exports = startServer;
