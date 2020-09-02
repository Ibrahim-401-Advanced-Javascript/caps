'use strict';

// ****************************************
// TCP STUFF ******************************
// ****************************************

require('dotenv').config();

const net = require('net');

const port = process.env.PORT || 3001;
const server = net.createServer();

server.listen(port, () => console.log(`Server Runnin' on Port ${port}`));

// create a list of clients that are connected to the server
let socketPool = {};

// when a client connects to a server:
server.on('connection', (socket) => {
  // assign each client a unique id
  const id = `Socket-${Math.random()}`;
  // add them to our socketpool list
  socketPool[id] = socket;

  console.log('conection', socketPool);

  // when events come in:
  socket.on('data', (buffer) => dispatchEvent(buffer));

  // socket.on('error', (e) => { console.log('SOCKET ERROR', e); });
  // socket.on('end', (e) => { delete socketPool[id]; });
});

// server.on('error', (e) => {
//   console.error('SERVER ERROR', e.message);
// });

const dispatchEvent = (buffer) => {
  let message = JSON.parse(buffer.toString().trim());
  broadcast(message);
};

function broadcast(message) {
  // Message is an object with 2 props: event and payload
  // We can use those to handle every event type and payload differently, if we choose
  let payload = JSON.stringify(message);
  for (let socket in socketPool) {
    socketPool[socket].write(payload)
  }
}

// ****************************************
// SOCKET.IO ******************************
// ****************************************

