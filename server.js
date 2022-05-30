const http = require('http');

setTimeout(async function () {
  const app = require('./app');

  const port = normalizePort(process.env.PORT || '8443');
  app.set('port', port);

  /**
   * Create HTTP server.
   */
  let options = {};
  const server = http.createServer(options, app);

  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
}, 100);

function normalizePort(val) {
  var port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) {
    return val;
  }

  // port number
  if (port >= 0) {
    return port;
  }

  return false;
}
