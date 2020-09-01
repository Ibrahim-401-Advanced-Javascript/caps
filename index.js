'use strict';

// EE = Event Emitter
const EE = require('events');

// global event pool, shared by all modules
const emitter = new EE();

// because we export the pool of events,
// any module that imports this file will get the same event pool
// technically we are exporting one instance of events
// singleton!

module.exports = emitter;

console.log('helloooooooooo');
