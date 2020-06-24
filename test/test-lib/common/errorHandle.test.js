const errorHandle = require('../../../lib/common/errorHandle');

test('Should return currect objects', () => {
  expect(typeof errorHandle).toBe('function')
})