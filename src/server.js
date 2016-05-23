var db = require('./database');
const express = require('express');

var app = express();

db.createDir();  // creates data folder if not existing

//  G E T
app.get('/', (request, response) => {
  response.send('Welcome to Doggie Information Resource Help Assistance Center for Doggie Enthusiasts');
});
// ---
app.get('/dogs', (request, response) => {
  db.fetchAll((err, array) => {
    if (err) response.json({Error: 'Something went wrong, sorry'});
    response.json({Dogs: array.toString()});
  });
});
// ---
app.get('/dogs/:breed', (request, response) => {
  var resource = request.params.breed;
  db.read(`${resource}.json`, (err, data) => {
    if (err) response.json({Error: 'Something went wrong, sorry'});
    response.json(data);
  });
});

// P O S T 
app.post('/dogs', (request, response) => {
  var body = '';
  request.on('data', chunk => {
    body += chunk;
  });
  request.on('end', () => {
    var parsedBody = JSON.parse(body);
    var thisBreed = parsedBody.breed;
    db.write(`${thisBreed}.json`, body, (err, data) => {
      if (err) response.json({Error: 'Something went wrong, sorry'});
      response.json({Success: data}); 
    });
  });
});

//  P U T
app.put('/dogs/:breed', (request, response) => {
  var breed = request.params.breed;
  db.write(`${breed}.json`, request.body, (err, data) => {
    if (err) response.json({Error: 'Something went wrong, sorry'});
    response.json({Success: data});
  });
});

//  D E L E T E
app.delete('/dogs/:breed', (request, response) => {
  var breed = request.params.breed;
  db.destroy(breed, (err) => {
    if (err) response.json({Error: 'Something went wrong, sorry'});
    response.json({Success: data});
  });
});
 
app.listen(8080);
  
module.exports = app;