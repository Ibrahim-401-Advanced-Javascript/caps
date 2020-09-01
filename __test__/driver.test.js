'use strict';

const driver = require('../js/vendor.js');
const emitter = require('../index.js');

jest.useFakeTimers();

beforeEach(jest.clearAllTimers);

const delivery = {
  store: 'CafeTurko',
  orderID: '1002',
  customer: 'Mel B',
  address: '14706 122nd Ave'
};

describe('handle pick up event', () => {

  it('should emit in-transit event at right time', () => {

    console.log = jest.fn();

    const inTransitHandler = jest.fn();

    emitter.on('in-transit', inTransitHandler);

    emitter.emit('pickup', delivery);

    expect(inTransitHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(inTransitHandler).toHaveBeenCalledTimes(1);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${delivery.orderID}`);

  });

  it('should emit delivered event at right time', () => {

    console.log = jest.fn();

    const deliveredHandler = jest.fn();

    emitter.on('delivered', deliveredHandler);

    emitter.emit('pickup', delivery);

    expect(deliveredHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(5000);

    expect(deliveredHandler).toHaveBeenCalledTimes(1);

    // WARNING: notice the "Last" in method name
    expect(console.log).toHaveBeenLastCalledWith(`DRIVER: delivered ${delivery.orderID}`);

  });
});
