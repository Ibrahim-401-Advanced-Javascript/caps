'use strict';

// EE = Event Emitter
const EE = require('events');
require('./caps.js');

// global event pool, shared by all modules
const events = new EE();

// because we export the pool of events,
// any module that imports this file will get the same event pool
// technically we are exporting one instance of events
// singleton!

module.exports = events;
