const checkFileExsist = require('../../../lib/common/checkFileExsist');

test('Should return currect objects', () => {
  expect(typeof checkFileExsist).toBe('function')
})

test('Should call fs exists once', () => { })
