'use strict';

const events = require('../events.js');
// main hub application

// logs every event to the console with:
// --timestamp, event payload
const handlePickup = (order) => {
  console.log(`Order ${order.orderID} was picked up by Driver`);
};

const handleInTransit = (order) => {
  console.log(`Order ${order.orderID} is in Transit to be Delivered`);
};

const handleDelivery = (order) => {
  console.log(`Order ${order.orderID} was Delivered.`);
};

// manages the state of every package:
// --ready for pickup, in transit, delivered
events.on('pickup', handlePickup);
events.on('in-transit', handleInTransit);
events.on('delivered', handleDelivery);


