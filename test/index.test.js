const index = require('../index')

test('Should return currect objects', () => {
  expect(typeof index).toBe('object')
  expect(typeof index['copyStatics']).toBe('function')
  expect(typeof index['renderHTMLs']).toBe('function')
})

const { copyStatics, renderHTMLs } = require('../index')

test('Should return currect objects', () => {
  expect(typeof copyStatics).toBe('function')
  expect(typeof renderHTMLs).toBe('function')
})