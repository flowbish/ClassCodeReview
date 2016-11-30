import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import LdapStrategy from 'passport-ldapauth';
import basicAuth from 'basic-auth';

import Svn from './svn.js';
import clang_format from './clang_format.js';
import passport from './authentication.js';

const app = express();
const svn = new Svn();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());

/**
 * Login.
 *
 * Parameters:
 *   username: NetID
 *   password: Active Directory password
 */
app.post('/api/session', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

/**
 * Logout.
 */
app.delete('/api/session', function(req, res) {
  req.logout();
  res.status(204).end();
});

function load_file(path, cb) {
  if (process.env.SVN_URL) {
    svn.get_file(process.env.SVN_URL + '/' + path, cb);
  } else {
    fs.readFile(path, 'utf8', cb);
  }
}

app.get('/api/file', (req, res) => {
  if (req.session) {
    console.log(req.session.passport.user);
  }
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

function list_files(path, cb) {
  if (process.env.SVN_URL) {
    svn.list_files(process.env.SVN_URL + '/' + path, cb);
  } else {
    cb('not implemented', null);
  }
}

app.get('/api/list', (req, res) => {
  const path = req.query.path;
  const format = req.query.format;
  if (path != null) {
    list_files(path, (err, files) => {
      if (err) {
        res.json({ error: 'unable to list file', details: err });
      } else {
        res.json({ contents: files });
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
