'use strict';

// ****************************************
// SOCKET.IO ******************************
// ****************************************

const ioClient = require('socket.io-client');
const socket = ioClient.connect('http://localhost:3001');

const driver = ioClient.connect('http://localhost:3001/driver');

const vendor = ioClient.connect('http://localhost:3001/vendor');

socket.emit('event', { order: 'eventName, time, orderID' } );

vendor.emit('pickup', 'PICKUP EVENT GOES HERE');
driver.emit('in-transit', 'IN-TRANSIT EVENT GOES HERE');
driver.emit('delivered', 'DELIVERED EVENT GOES HERE');


// ****************************************
// EMITTER EVENTS *************************
// ****************************************

// const emitter = require('../index.js');

// const handleEvents = (eventName) => {
//   return payload => {
//     let time = new Date();
//     console.log('EVENT', { event:eventName, time, payload });
//   };
// };

// emitter.on('pickup', handleEvents('pickup'));
// emitter.on('in-transit', handleEvents('in-transit'));
// emitter.on('delivered', handleEvents('delivered'));
