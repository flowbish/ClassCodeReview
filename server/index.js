const express = require('express');
const app = express();
const fs = require('fs');
const tmp = require('tmp');
const spawn = require('child_process').spawn;
const streams = require('memory-streams');

var clang_format = function(contents, style, callback) {
  const args = [`-style=${style}`];
  const proc = spawn('clang-format', args, { maxBuffer: 1000000 });
  var writer = new streams.WritableStream();
  proc.stdin.write(contents);
  proc.stdin.end();
  proc.stdout.pipe(writer);
  proc.stdout.on('end', () => {
    callback(writer.toString('utf8'));
  })
}

app.get('/api/file', (req, res) => {
  const path = req.query.path;
  const format = req.query.format;
  if (path != null) {
    fs.readFile(path, 'utf8', function read(err, data) {
      if (err) {
        res.json({ error: `unable to load file "${path}"` });
      } else {
        if (format != null && format != 'none') {
          clang_format(data, format, function(contents) {
            res.json({ contents: contents });
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
