'use strict';

const emitter = require('../index.js');

const handleEvents = (eventName) => {
  return payload => {
    let time = new Date();
    console.log('EVENT', { event:eventName, time, payload });
  };
};

emitter.on('pickup', handleEvents('pickup'));
emitter.on('in-transit', handleEvents('in-transit'));
emitter.on('delivered', handleEvents('delivered'));

