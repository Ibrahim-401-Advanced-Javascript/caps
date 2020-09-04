'use strict';

const client = require('socket.io-client');
const socket = client.connect('http://localhost:3000');

// socket.emit('vendors-missed-pickup-logs');

socket.on('pickup', (purchase) => {
  console.log('');
  console.log(`Order ${purchase.orderNumber} is ready to be picked up by Driver`);
});


// socket.emit('vendors-missed-delivered-logs');

socket.on('delivered', (payload2) => {
  console.log('');
  console.log(`Order ${payload2.orderNum} has been delivered`);
  socket.emit('complete', payload2);
});

