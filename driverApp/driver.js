'use strict';

const client = require('socket.io-client');
const socket = client.connect('http://localhost:3000');


// instruct server to transmit all the messages
// missed while server is offline:
// socket.emit('drivers-missed-logs');

socket.on('in-transit', (payload1) => {
  console.log(`Driver, thank you for picking up Order ${payload1.orderNum}.`);
  socket.emit('picked-up', payload1);
});
