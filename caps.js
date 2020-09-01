'use strict';

const events = require('./index.js');

// const onPickup = (payload) => {
//   let time = new Date();
//   console.log('EVENT', { event:'pickup', time, payload });
// };

// const onInTransit = (payload) => {
//   let time = new Date();
//   console.log('EVENT', { event:'in-transit', time, payload });
// };

// const onDelivery = (payload) => {
//   let time = new Date();
//   console.log('EVENT', { event:'delivered', time, payload });
// };


const handleEvents = (eventName) => {
  return payload => {
    let time = new Date();
    console.log('[EVENT]', { event:eventName, time, payload });
  };
};

events.on('pickup', handleEvents('pickup'));
events.on('in-transit', handleEvents('in-transit'));
events.on('delivered', handleEvents('delivered'));
