'use strict';

const events = require('../events.js');

events.on('pickup', payload => console.log('pickup', payload));

events.on('in-transit', payload => console.log('in-transit', payload));

events.on('delivered', payload => console.log('delivered', payload));

const logger = (event, payload) => {
  let time = new Date();
  console.log('EVENT LOG', { time, event, payload });
};

module.exports = logger;
