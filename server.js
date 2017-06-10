const request = require('request-promise');
const express = require('express');
const path = require('path');
const app = express();

const BASE_API = 'http://pokeapi.co/api/v2';
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/pokedex', function(req, res) {
  const options = {
    uri: `${BASE_API}/pokemon`,
    json: true
  };

  request(options)
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.get('/pokedex/details', function(req, res) {
  const options = {
    uri: req.query.url,
    json: true
  };

  request(options)
    .then(data => {
      res.send({ data });
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

app.listen(PORT, err => {
  if (err) {
    throw err;
  }

  console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});
