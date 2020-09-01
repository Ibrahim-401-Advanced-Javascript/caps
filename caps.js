'use strict';

const emitter = require('./index.js');

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
    console.log('EVENT', { event:eventName, time, payload });
  };
};

emitter.on('pickup', handleEvents('pickup'));
emitter.on('in-transit', handleEvents('in-transit'));
emitter.on('delivered', handleEvents('delivered'));

