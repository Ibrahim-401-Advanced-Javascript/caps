'use strict';

const client = require('socket.io-client');
const socket = client.connect('http://localhost:3000');

let w = 0;
let x = 0;
let y = 0;

setInterval(() => {
  socket.emit('order-ready', `${w++}`);
}, 1000);

setInterval(() => {
  socket.emit('order-in-transit', `${x++}`);
}, 4000);

setInterval(() => {
  socket.emit('order-delivered', `${y++}`);
}, 7000);
