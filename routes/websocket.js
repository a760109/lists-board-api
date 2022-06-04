const WebSocket = require('ws');

let wss;
const mapTokenToWs = {};

function init(server) {
  wss = new WebSocket.Server({ server });
  wss.on('connection', onConnection);
}

async function onConnection(ws, req) {
  ws.on('message', onMessage);
  ws.on('ping', onPing);
  ws.on('close', onClose);

  const secProtocol = req.headers['sec-websocket-protocol'] || '';
  let protocols = secProtocol.split(', ');

  if (protocols.length >= 2 && protocols[0] === 'AUTH0-TOKEN') {
    const token = protocols[1];
    mapTokenToWs[token] = ws;

    ws.token = token;
  }
}

async function onMessage(message) {
  if (!message) {
    return;
  }
  try {
    console.log('onMessage', message);
  } catch (e) {
    console.log(`onMessage error=${e.message}, ${this.logSuffix}`, this.logMeta);
  }
}

async function onPing() {
  console.log('onPing');
}

function onClose(event) {
  if (this.token) {
    delete mapTokenToWs[this.token];
  }
}

async function dispatchMessage(excludeToken, message) {
  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  for (const [token, ws] of Object.entries(mapTokenToWs)) {
    if (token !== excludeToken) {
      try {
        // console.log(`dispatchMessage to ws: ${message}`);
        ws.send(message);
      } catch (error) {
        console.log(`[ERROR] dispatchMessage ${error.message}`);
      }
    }
  }
}

module.exports = {
  init,
  dispatchMessage,
};
