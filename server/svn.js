var svn = require('node-svn-ultimate').commands;

module.exports.file_download = function(url, params, cb) {
  svn.cat(url, params, cb)
}

module.exports.file_info = function(url, params, cb) {
  svn.info(url, params, cb)
}
