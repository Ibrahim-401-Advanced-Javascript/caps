'use strict';

jest.useFakeTimers();
const emitter = require('../index.js');
require('../caps.js');

const delivery = {
  store: 'MamaSambusa',
  orderID: '0001',
  customer: 'Munir Mcfly',
  address: '4040 11th Ave',
};

it('should log pickup', () => {

  console.log = jest.fn();

  emitter.emit('pickup', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT',
    expect.objectContaining({event:'pickup'}));

});

it('should log in-transit', () => {

  console.log = jest.fn();

  emitter.emit('in-transit', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event:'in-transit'}));

});

it('should log delivered', () => {

  console.log = jest.fn();

  emitter.emit('delivered', delivery);

  expect(console.log).toHaveBeenLastCalledWith('EVENT', expect.objectContaining({event:'delivered'}));

});
