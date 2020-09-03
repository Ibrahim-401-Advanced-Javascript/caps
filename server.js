'use strict';

require('dotenv').config();

// ****************************************
// SOCKET.IO ******************************
// ****************************************

const io = require('socket.io')(process.env.PORT || 3001);

io.on('connection', (socket) => {
  console.log('CONNECTED TO', socket.id);

  socket.on('pickup', (payload) => {
    console.log('received pickup message', payload);
    io.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    console.log('received in-transit message', payload);
    io.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    console.log('received delivered message', payload);
    io.emit('delivered', payload);
  });

});

// CAPS NAMESPACE
// couple with caps.js client
const caps = io.of('/caps');
caps.on('connection', (socket) => {

  console.log('CAPS NAMESPACE ON', socket.id);

  socket.on('pickup', (payload) => {
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', (payload) => {
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    caps.emit('delivered', payload);
  });

});

// COUPLE WITH DRIVER

const driver = io.of('/driver');

driver.on('connection', (socket) => {
  console.log('DRIVER CHANNEL', socket.id);

  socket.on('join', room => {
    console.log('ABOUT TO JOIN', room);
    socket.join(room);
  });

  socket.on('in-transit', (payload) => {
    driver.to('caps').emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    driver.to('caps').emit('delivered', payload);
  });


});


// COUPLE WITH VENDOR

const vendor = io.of('/vendor');

vendor.on('connection', (socket) => {
  console.log('VENDOR CHANNEL', socket.id);

  socket.on('join', room => {
    console.log('ABOUT TO JOIN', room);
    socket.join(room);
  });

  socket.on('pickup', (payload) => {
    vendor.to('caps').emit('pickup', payload);
  });


});
