class Repository {
  constructor(vcs, base_url) {
    this.vcs = vcs;
    this.base_url = base_url;
  }

  projects(netid, cb) {
    vcs.list_files(this.base_url + '/' + netid, cb);
  }
}

export default Repository;
