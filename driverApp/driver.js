'use strict';

// ****************************************
// SOCKET.IO ******************************
// ****************************************

const ioClient = require('socket.io-client');

const driverChannel = ioClient.connect('http://localhost:3001/driver');

driverChannel.emit('join', 'caps');

driverChannel.on('in-transit', (payload) => {
  console.log('LOGGING IN-TRANSIT FROM DRIVER.JS', payload);
});

driverChannel.on('delivered', (payload) => {
  console.log('LOGGING DELIVERED FROM DRIVER.JS', payload);
});


// ****************************************
// EMITTER EVENTS *************************
// ****************************************

// const emitter = require('../index.js');

// const onInTransit = (order) => {

//   setTimeout(() => {
//     console.log(`DRIVER: picked up ${order.orderID}`);
//     emitter.emit('in-transit', order);
//   }, 1000);

//   setTimeout(() => {
//     console.log('Delivered! Thank you.');
//     emitter.emit('delivered', order.orderID);
//   }, 3000);

// };

// emitter.on('in-transit', onInTransit);
