var expect = require('chai').expect;
var svn = require('../server/svn.js');

describe('svn', function() {
    describe('load_svn_file', function() {
        var data, err;

        before(function(done){
            this.timeout(10000);
            svn.file_download(
                'https://subversion.ews.illinois.edu/svn/fa16-cs241/_shared/password_cracker/cracker1.c',
                { username: 'pmsmith2' },
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
});
