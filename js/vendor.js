'use strict';

const emitter = require('../index.js');
require('dotenv').config();
const store = process.env.STORE;


// every five seconds, simulate a new customer order:
// --create a fake order as an object:
// ----storeName, orderId, customerName, address

// --emit a pickup event and attach the fake order as payload

const onPickup  = (order) => {

  order = {
    store: store,
    orderID: '1002',
    customer: 'Mel B',
    address: '14706 122nd Ave'
  };

  setInterval(() => {
    console.log(`ORDER: ${order.orderID} is ready for pickup.`);
    emitter.emit('', order);
  }, 5000);

};

emitter.on('pickup', onPickup);
