'use strict';

const client = require('socket.io-client');
const socket = client.connect('http://localhost:3000');

let w = 1;
let x = 1;
let y = 1;

setInterval(() => {
  socket.emit('order-ready', `${w++}`);
}, 1000);

setInterval(() => {
  socket.emit('order-in-transit', `${x++}`);
}, 4000);

setInterval(() => {
  socket.emit('order-delivered', `${y++}`);
}, 7000);
