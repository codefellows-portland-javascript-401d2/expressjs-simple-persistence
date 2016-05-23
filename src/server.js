var db = require('./database');
const express = require('express');

var app = express();

// creates data folder if not existing
db.createDir((err, data) => {
  console.log(data);
});  

//  G E T
app.get('/', (request, response) => {
  response.send('Welcome to Doggie Information Resource Help Assistance Center for Doggie Enthusiasts');
});
// ---
app.get('/dogs', (request, response) => {
  db.fetchAll((err, array) => {
    if (err) response.json({Error: 'Something went wrong, sorry'});
    response.json({dogs: array});
  });
});
// ---
app.get('/dogs/:breed', (request, response) => {
  var resource = request.params.breed;
  db.read(`${resource}.json`, (err, data) => {
    if (err) {
      response.status(404);
      response.json({Error: 'Resource Not Found'});
    }
    if (data) response.send(data.toString());
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
      response.json({success: data}); 
    });
  });
});

//  P U T
app.put('/dogs/:breed', (request, response) => {
  var breed = request.params.breed;
  var body = '';
  request.on('data', (chunk) => {
    body += chunk;
  });
  request.on('end', () => {
    db.write(`${breed}.json`, body, (err, data) => {
      if (err) response.json({Error: 'Something went wrong, sorry'});
      response.json({success: data});
    });
  });
});

//  D E L E T E
app.delete('/dogs/:breed', (request, response) => {
  var breed = request.params.breed;
  db.destroy(`${breed}.json`, (err, data) => {
    if (err) response.json({Error: 'Something went wrong, sorry'});
    response.send({success: data});
  });
});
 
// app.listen(8080);
  
module.exports = app;