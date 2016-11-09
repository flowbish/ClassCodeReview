import { expect } from 'chai';

import clang_format from '../server/clang_format.js';

describe('clang_format', function() {
  describe('format code', function() {
    var data, err;

    before(function(done) {
      clang_format(
        'struct node { int x, int y };',
        'google',
        function(_err, _data) {
          data = _data;
          err = _err;
          done();
        });
    });

    it('should be able to load a file from svn', function() {
      expect(err).to.be.null;
      expect(data).to.be.a("string");
    });
  });
});
