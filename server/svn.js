import { commands as _svn } from 'node-svn-ultimate';

function split_path(path) {
  return path.split('/');
}

function filename(path) {
  const components = split_path(path);
  return components[components.length - 1];
}

/* file = {
 *   '$': { kind: 'file' },
 *   name: 'example.txt',
 *   size: 4096,
 *   commit: {
 *     '$': { revision: "450" },
 *     author: pmsmith2,
 *     date: "2016-10-24T05:01:37.060542Z"
 *   }
 * }
 */

function normalize_svn_list_element(elem) {
  var new_elem = {};
  new_elem.type = elem['$'].kind;
  new_elem.path = elem.name;
  new_elem.name = filename(elem.name);
  new_elem.revision = elem.commit['$'].revision;
  new_elem.date = elem.commit.date;
  if (elem['$'].kind == "file") {
    new_elem.size = elem.size;
  }
  return new_elem;
}

function transform_svn_list_data(data) {
  var dir = [];
  for (var entry of data.list.entry) {
    entry = normalize_svn_list_element(entry);
    dir.push(entry);
  }
  return dir;
}

class Svn {
  constructor(params, svn=_svn) {
    this.params = params;
    this.svn = svn;
  }

  list_files(url, cb) {
    this.svn.list(url, this.params, (err, data) => {
      if (err != null) {
        cb(err, null);
      }
      cb(null, transform_svn_list_data(data));
    });
  }

  get_file(url, cb) {
    this.svn.cat(url, this.params, cb);
  }

  get_info(url, cb) {
    this.svn.info(url, this.params, cb);
  }
}

export default Svn;
