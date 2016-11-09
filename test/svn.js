import simple from 'simple-mock';
import { expect } from 'chai';

import Svn from '../server/svn.js';

const test_directory_list = {
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
            "date": "a_date"
          },
          "file1": {
            "name": "file1.1",
            "type": "file",
            "revision": "rev1",
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
        "date": "b_date"
      }
    }
  }
};

// Mock svn so we don't have to download anything to test
const svn = new Svn({ username: 'pmsmith2'});
simple.mock(svn, 'get_file').callbackWith(null, 'test');
simple.mock(svn, 'list_files').callbackWith(null, test_directory_list);

describe('svn', function() {
  describe('load_svn_file', function() {
    var data, err;

    before(function(done) {
      this.timeout(10000);
      svn.get_file(
        'https://subversion.ews.illinois.edu/svn/fa16-cs241/_shared/password_cracker/cracker1.c',
        function(_err, _data) {
          data = _data;
          err = _err;
          done();
        });
    });

    it('should be able to load a file from svn', function() {
      expect(err).to.be.null;
      expect(data).to.be.ok;
    });
  });

  describe('list_svn_dir', function() {
    var data, err;

    before(function(done) {
      this.timeout(10000);
      svn.list_files(
        'https://subversion.ews.illinois.edu/svn/fa16-cs241/_shared/',
        function(_err, _data) {
          data = _data;
          err = _err;
          done();
        });
    });

    it('should be able to list files from svn directory', function() {
      expect(err).to.be.null;
      expect(data).to.be.ok;
    });
  });
});
