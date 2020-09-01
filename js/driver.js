'use strict';

const emitter = require('../index.js');

const onInTransit = (order) => {
  // wait 1 second
  // --console.log('DRIVER: picked up [ORDER_ID]')
  // --emit an 'in-transit' event with the payload received
  setTimeout(() => {
    console.log(`DRIVER: picked up ${order.orderID}`);
    emitter.emit('in-transit', order);
  }, 1000);

  // --wait 3 seconds
  // --whenever delivery occurs, console.log 'thank you'
  // --emit a 'delivered' event with the same payload
  setTimeout(() => {
    console.log('Delivered! Thank you.');
    emitter.emit('delivered', order);
  }, 3000);

};

emitter.on('in-transit', onInTransit);


