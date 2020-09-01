'use strict';

const driver = require('../js/driver.js');
const emitter = require('../index.js');

jest.useFakeTimers();

beforeEach(jest.clearAllTimers);

const order = {
  store: 'CafeTurko',
  orderID: '1002',
  customer: 'Mel B',
  address: '14706 122nd Ave'
};

describe('handle pick up event', () => {

  it('should emit in-transit event at right time', () => {

    console.log = jest.fn();

    const onInTransit = jest.fn();

    emitter.on('in-transit', onInTransit);

    emitter.emit('pickup', order);

    expect(onInTransit).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(1000);

    expect(onInTransit).toHaveBeenCalledTimes(1);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: picked up ${order.orderID}`);

  });

  it('should emit delivered event at right time', () => {

    console.log = jest.fn();

    const deliveredHandler = jest.fn();

    emitter.on('delivered', deliveredHandler);

    emitter.emit('pickup', order);

    expect(deliveredHandler).toHaveBeenCalledTimes(0);

    jest.advanceTimersByTime(5000);

    expect(deliveredHandler).toHaveBeenCalledTimes(1);

    // WARNING: notice the "Last" in method name
    expect(console.log).toHaveBeenLastCalledWith(`DRIVER: delivered ${order.orderID}`);

  });


});
