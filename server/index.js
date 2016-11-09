import express from 'express';
import fs from 'fs';

import Svn from './svn.js';
import clang_format from './clang_format.js';

const app = express();
const svn = new Svn();

app.get('/api/file', (req, res) => {
  const path = req.query.path;
  const format = req.query.format;
  if (path != null) {
    fs.readFile(path, 'utf8', function read(err, data) {
      if (err) {
        res.json({ error: `unable to load file "${path}"` });
      } else {
        if (format != null && format != 'none') {
          clang_format(data, format, function(err, contents) {
            if (err == null) {
              res.json({ contents: contents });
            } else {
              res.json({ error: 'error formatting contents' });
            }
          });
        } else {
          res.json({ contents: data });
        }
      }
    });
  } else {
    res.json({ error: 'no path specified' });
  }
});

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
};

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
