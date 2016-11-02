const express = require('express');
const app = express();
const fs = require('fs');

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/file', (req, res) => {
    const path = req.query.path;
    if (path != null) {
        fs.readFile(path, 'utf8', function read(err, data) {
            if (err) {
                res.json({ error: `unable to load file "${path}"` });
            } else {
                res.json({ contents: data });
            }
        });
    }
    else {
        res.json({ error: 'no path specified' });
    }
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
