const executableURL = '../../bin/execute'
const fs = require('fs')
const path = require('path')
var exec = require('child_process').exec
jest.mock('fs')

describe('listFilesInDirectorySync', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js': 'console.log("file1 contents");',
    '/path/to/file2.txt': 'file2 contents',
  }

  beforeEach(() => {
    require('fs').__setMockFiles(MOCK_FILE_INFO)
  })

  test('render', async (done) => {
    await exec(executableURL, (err, out) => {
      console.log(err, out);
      // TODO: check if files are created!
      expect();
      done();
    });
  })
})
