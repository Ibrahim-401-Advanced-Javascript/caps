'use strict';

const vendor = require('../js/vendor.js');
const emitter = require('../events.js');

jest.useFakeTimers();

it('should receive delivery politely', () => {
  console.log = jest.fn();
  emitter.emit('delivered', { orderID : '1002' });
  expect(console.log).toHaveBeenCalledWith('VENDOR: Thank you for delivering 1002');
});

it('should emit order', () => {

  const callback = jest.fn();

  emitter.on('pickup', callback);

  expect(callback).not.toBeCalled();

  vendor.start();

  jest.runOnlyPendingTimers();

  expect(callback).toBeCalledWith(expect.objectContaining({store:'CafeTurko'}));

  expect(callback).toHaveBeenCalledTimes(1);

});

