import express from 'express';
import fs from 'fs';

import Svn from './svn.js';
import clang_format from './clang_format.js';

const app = express();
const svn = new Svn();

function load_file(path, cb) {
  if (process.env.SVN_URL) {
    svn.get_file(process.env.SVN_URL + '/' + path, cb);
  } else {
    fs.readFile(path, 'utf8', cb);
  }
}

app.get('/api/file', (req, res) => {
  const path = req.query.path;
  const format = req.query.format;
  if (path != null) {
    load_file(path, (err, data) => {
      if (err) {
        res.json({ error: `unable to load file`, details: err });
      } else {
        if (format != null && format != 'none') {
          clang_format(data, format, (err, contents) => {
            if (err) {
              res.json({ error: 'error formatting contents', details: err });
            } else {
              res.json({ contents: contents });
            }
          });
        } else {
          res.json({ contents: data });
        }
      }
    });
  } else {
    res.json({ error: 'must specify a path' });
  }
});

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
