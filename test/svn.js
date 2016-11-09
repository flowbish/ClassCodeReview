import simple from 'simple-mock';
import { expect } from 'chai';

import Svn from '../server/svn.js';

const test_list_files_input = {
  "list": {
    "$": { "path": "https://example.com/svn" },
    "entry": [
      {
        "$": { "kind": "file" },
        "name": "file1",
        "size": "2710",
        "commit": {
          "$": { "revision": "58300" },
          "author": "kocheva2",
          "date": "2016-10-24T05:01:37.060542Z"
        }
      },
      {
        "$": { "kind": "dir" },
        "name": "dir1",
        "commit": {
          "$": { "revision": "58300" },
          "author": "kocheva2",
          "date": "2016-10-24T05:01:37.060542Z"
        }
      },
      {
        "$": { "kind": "dir" },
        "name": "dir1/dir1.1",
        "commit": {
          "$": { "revision": "58300" },
          "author": "kocheva2",
          "date": "2016-10-24T05:01:37.060542Z"
        }
      },
      {
        "$": { "kind": "file" },
        "name": "dir1/dir1.1/file1",
        "size": "16",
        "commit": {
          "$": { "revision": "58300" },
          "author": "kocheva2",
          "date": "2016-10-24T05:01:37.060542Z"
        }
      },
      {
        "$": { "kind": "file" },
        "name": "dir1/dir1.1/file1.1",
        "size": "16",
        "commit": {
          "$": { "revision": "58300" },
          "author": "kocheva2",
          "date": "2016-10-24T05:01:37.060542Z"
        }
      },
      {
        "$": { "kind": "dir" },
        "name": "dir2",
        "commit": {
          "$": { "revision": "58300" },
          "author": "kocheva2",
          "date": "2016-10-24T05:01:37.060542Z"
        }
      },
      {
        "$": { "kind": "file" },
        "name": "dir2/file2",
        "size": "16",
        "commit": {
          "$": { "revision": "58300" },
          "author": "kocheva2",
          "date": "2016-10-24T05:01:37.060542Z"
        }
      }
    ]
  }
};

const test_list_files_output = [
  {
    type: 'file',
    path: 'file1',
    name: 'file1',
    revision: '58300',
    date: '2016-10-24T05:01:37.060542Z',
    size: '2710'
  },
  {
    type: 'dir',
    path: 'dir1',
    name: 'dir1',
    revision: '58300',
    date: '2016-10-24T05:01:37.060542Z'
  },
  {
    type: 'dir',
    path: 'dir1/dir1.1',
    name: 'dir1.1',
    revision: '58300',
    date: '2016-10-24T05:01:37.060542Z'
  },
  {
    type: 'file',
    path: 'dir1/dir1.1/file1',
    name: 'file1',
    revision: '58300',
    date: '2016-10-24T05:01:37.060542Z',
    size: '16'
  },
  {
    type: 'file',
    path: 'dir1/dir1.1/file1.1',
    name: 'file1.1',
    revision: '58300',
    date: '2016-10-24T05:01:37.060542Z',
    size: '16'
  },
  {
    type: 'dir',
    path: 'dir2',
    name: 'dir2',
    revision: '58300',
    date: '2016-10-24T05:01:37.060542Z'
  },
  {
    type: 'file',
    path: 'dir2/file2',
    name: 'file2',
    revision: '58300',
    date: '2016-10-24T05:01:37.060542Z',
    size: '16'
  }
];

// TODO: make output look like this
const _test_list_files_output = {
  "dir1": {
    "name": "dir1",
    "type": "dir",
    "files": {
      "dir1.1": {
        "name": "dir1.1",
        "type": "dir",
        "files": {
          "file1.1": {
            "name": "file1.1",
            "type": "file",
            "revision": "rev1.1",
            "size": "16",
            "date": "a_date"
          },
          "file1": {
            "name": "file1.1",
            "type": "file",
            "revision": "rev1",
            "size": "16",
            "date": "a_date"
          }
        }
      }
    }
  },
  "file1": {
    "name": "file1",
    "type": "file",
    "revision": "rev1",
    "size": "2710",
    "date": "a_date"
  },
  "dir2": {
    "name": "dir2",
    "type": "dir",
    "files": {
      "file2": {
        "name": "file2",
        "type": "file",
        "revision": "rev2",
        "size": "16",
        "date": "b_date"
      }
    }
  }
};

const test_get_file_input = "This is the contents of a file!";

// Mock svn so we don't have to download anything to test
var _svn = {};
const svn = new Svn({ username: 'pmsmith2', depth: 'infinity' }, _svn);

describe('svn', function() {
  describe('get_file', function() {
    var data, err;

    before(function(done) {
      simple.mock(_svn, 'cat').callbackWith(null, test_get_file_input);
      svn.get_file(
        'some/path',
        function(_err, _data) {
          data = _data;
          err = _err;
          done();
        });
    });

    it('should be able to load a file from svn', function() {
      expect(err).to.be.null;
      expect(data).to.be.a("string");
      expect(data).to.equal(test_get_file_input);
    });

    after(function(done) {
      simple.restore(_svn, 'cat');
      done();
    });
  });

  describe('list_files', function() {
    var data, err;

    before(function(done) {
      simple.mock(_svn, 'list').callbackWith(null, test_list_files_input);
      svn.list_files(
        'some/path',
        function(_err, _data) {
          data = _data;
          err = _err;
          done();
        });
    });

    it('should be able to list files from svn directory', function() {
      expect(err).to.be.null;
      expect(data).to.be.an('array');
      expect(data).to.deep.equal(test_list_files_output);
    });

    after(function(done) {
      simple.restore(_svn, 'list');
      done();
    });
  });

  describe('list_files', function() {
    var data, err;

    before(function(done) {
      simple.mock(_svn, 'list').callbackWith('ERROR', null);
      svn.list_files(
        'some/path',
        function(_err, _data) {
          data = _data;
          err = _err;
          done();
        });
    });

    it('should be able to handle invalid paths', function() {
      expect(err).to.be.ok;
      expect(data).to.be.null;
    });

    after(function(done) {
      simple.restore(_svn, 'list');
      done();
    });
  });
});
