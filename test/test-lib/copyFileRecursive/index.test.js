'use strict'

const copyfiles = require('../../../lib/copyFileRecursive/index')
jest.mock('fs')
// jest.mock(copyfiles, () => jest.fn())

test('Should return currect objects', () => {
  expect(typeof copyfiles).toBe('function')
})

test('Should call -- once', () => { })
test('Should call fs.createfile once', () => { })

describe('recursive copy', () => {
  // it('calls itself once', () => {
  //   resetCreationModal();
  //   expect(copyfiles.mock.calls.length).toBe(1);
  // })
  // it('calls copy file of fs twice', () => {
  //   resetCreationModal();
  //   expect(copyfiles.mock.calls.length).toBe(1);
  // })
})

describe('listFilesInDirectorySync', () => {
  const MOCK_FILE_INFO = {
    '/path/to/file1.js': 'console.log("file1 contents");',
    '/path/to/file2.txt': 'file2 contents',
  }

  beforeEach(() => {
    // Set up some mocked out file info before each test
    require('fs').__setMockFiles(MOCK_FILE_INFO)
  })

  test('includes all files in the directory in the summary', () => {
    // const FileSummarizer = require('../FileSummarizer')
    // const fileSummary = FileSummarizer.summarizeFilesInDirectorySync(
    //   '/path/to',
    // )

    // expect(fileSummary.length).toBe(2)
  })
})