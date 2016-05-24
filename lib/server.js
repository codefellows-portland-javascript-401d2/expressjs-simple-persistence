const store = require('./store');
const express = require('express');

var app = express();

const errorMessage = 'Sorry, but that is an invalid request';

app.get('/', (req, res) => {
  store.read([])
  .then( list => res.send(list))
  .catch( () => res.status(404).send(errorMessage));
});

app.get('/*', (req, res) => {
  store.read([req.path])
  .then( dataArray => {
    var body = '';
    for (var i = 0; i<dataArray.length; i++){
      body += JSON.stringify(dataArray[i]);
    }
    res.send(body);
  })
  .catch( () => res.status(404).send(errorMessage));
});

app.post('/*', (req, res) => {
  var body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    store.create(JSON.parse(body))
    .then( data => res.json(data))
    .catch( () => res.status(404).send(errorMessage));
  });
});

app.put('/*', (req, res) => {
  var body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    store.update(req.path.slice(1), JSON.parse(body))
    .then( data => res.json(data))
    .catch( () => res.status(404).send(errorMessage));
  });
});

app.delete('/*', (req, res) => {
  store.delete(req.path.slice(1))
  .then( data => res.send(data))
  .catch( () => res.status(404).send(errorMessage));
});


module.exports = app;
