'use strict';

// ****************************************
// SOCKET.IO ******************************
// ****************************************

const ioClient = require('socket.io-client');

const vendorChannel = ioClient.connect('http://localhost:3001/vendor');

vendorChannel.emit('join', 'caps');

vendorChannel.on('pickup', (payload) => {
  console.log('LOGGING PICKUP FROM VENDOR.JS');
});


// ****************************************
// EMITTER EVENTS *************************
// ****************************************

// const emitter = require('../index.js');
// require('dotenv').config();
// const store = process.env.STORE;

// const onPickup  = (order) => {

//   order = {
//     store: store,
//     orderID: '1002',
//     customer: 'Mel B',
//     address: '14706 122nd Ave'
//   };

//   setInterval(() => {
//     console.log(`ORDER: ${order.orderID} is ready for pickup.`);
//     emitter.emit('pickup', order);
//   }, 5000);

// };

// emitter.on('pickup', onPickup);
