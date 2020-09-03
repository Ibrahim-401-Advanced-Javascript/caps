'use strict';

require('dotenv').config();

// ****************************************
// TCP STUFF ******************************
// ****************************************


// const net = require('net');

// const port = process.env.PORT || 3001;
// const server = net.createServer();

// server.listen(port, () => console.log(`Server Runnin' on Port ${port}`));

// // create a list of clients that are connected to the server
// let socketPool = {};

// // when a client connects to a server:
// server.on('connection', (socket) => {
//   // assign each client a unique id
//   const id = `Socket-${Math.random()}`;
//   // add them to our socketpool list
//   socketPool[id] = socket;

//   console.log('conection', socketPool);

//   // when events come in:
//   socket.on('data', (buffer) => dispatchEvent(buffer));

//   // socket.on('error', (e) => { console.log('SOCKET ERROR', e); });
//   // socket.on('end', (e) => { delete socketPool[id]; });
// });

// // server.on('error', (e) => {
// //   console.error('SERVER ERROR', e.message);
// // });

// const dispatchEvent = (buffer) => {
//   let message = JSON.parse(buffer.toString().trim());
//   broadcast(message);
// };

// function broadcast(message) {
//   // Message is an object with 2 props: event and payload
//   // We can use those to handle every event type and payload differently, if we choose
//   let payload = JSON.stringify(message);
//   for (let socket in socketPool) {
//     socketPool[socket].write(payload);
//   }
// }

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
