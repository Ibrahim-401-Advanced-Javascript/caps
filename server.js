'use strict';

require('dotenv').config();
const { v4: uuidv4 } = require('uuid');

const io = require('socket.io')(3000);

// if messages sent are not able to be received,
// i.e. server is offline, queue them to enable
// transmission upon reconnection:
const queue = {
  order: {  }
}

io.on('connection', (socket) => {
  console.log('connection made on socket', socket.id);


  socket.on('order-ready', (orderNumber) => {
    console.log('');
    console.log(`Order ${orderNumber} is ready for pickup`);

    const id = uuidv4();
    queue.order[id] = orderNumber;
    // console.log(queue.order);
    const payload = { id, orderNumber };

    socket.broadcast.emit('pickup', payload);

  });

  socket.on('order-in-transit', (orderNum) => {

    const id = uuidv4();
    queue.order[id] = orderNum;
    // console.log(queue.order);
    const payload = { id, orderNum };

    socket.broadcast.emit('in-transit', payload);
  });

  socket.on('order-delivered', (orderNum) => {
    const id = uuidv4();
    queue.order[id] = orderNum;
    // console.log(queue.order);
    const payload = { id, orderNum };

    socket.broadcast.emit('delivered', payload);
  });


  socket.on('drivers-missed-logs', () => {
    console.log('listening for driver\'s missed logs on server');
    // re-emit all queued logs
    for (let id in queue.order) {
      const missed = queue.order.id;
      const payload = { id, missed };
      socket.broadcast.emit('in-transit', payload);
    }
  });

  socket.on('picked-up', (payload) => {
    // inspect payload for an id
    // use that as a key to delete from queue
    console.log('');
    console.log(`Driver Picked Up Order ${payload.orderNum} and it is in-transit`);
    let id = payload.id;
    delete queue.order[id];
    // console.log(queue.order);
  });

  socket.on('complete', (payload2) => {
    console.log('');
    console.log(`Delivery has been completed for Order ${payload2.orderNum}. Thank you!`);
    let id = payload2.id;
    delete queue.order[id];
    // console.log(queue.order);
  });

});



