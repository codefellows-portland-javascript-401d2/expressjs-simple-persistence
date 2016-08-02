const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db');

app.use(bodyParser.json());

app.get('/books/:id', (req, res) => {
  db.read(req.params.id)
    .then(data => res.send(data));
});

app.get('/books', (req, res) => {
  db.read([])
    .then(data => res.send(data));
});

app.post('/books', (req, res) => {
  db.create(req.body)
    .then(data => res.send(data));
});

app.put('/books/:id', (req, res) => {
  db.update(req.params.id, req.body)
    .then(data => res.send(data));
});

app.delete('/books/:id', (req, res) => {
  db.delete(req.params.id)
    .then(data => res.send(data));
});

module.exports = app;
