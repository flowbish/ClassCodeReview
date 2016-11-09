var svn = require('node-svn-ultimate').commands;

class Svn {
  constructor(params) {
    this.params = params;
  }

  list_files(url, cb) {
    svn.list(url, this.params, cb);
  }

  get_file(url, cb) {
    svn.cat(url, this.params, cb);
  }

  get_info(url, cb) {
    svn.info(url, this.params, cb);
  }
}

export default Svn;
