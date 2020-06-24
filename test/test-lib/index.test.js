const index = require('../../lib/index');

test('Should return currect objects', () => {
  expect(typeof index).toBe('object');
  expect(typeof index['copyStatics']).toBe('function');
  expect(typeof index['renderHTMLs']).toBe('function');
});