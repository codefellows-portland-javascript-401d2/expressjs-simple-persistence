const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

chai.use(chaiHttp);

describe('running http server', () => {

  var request = chai.request(server);
  var post = '{"breed": "doberman"}';
   
  it('posts', (done) => {
    request
        .post('/dogs')
        .send(post)
        .end((err, response) => {
          assert.equal(response.statusCode, 200);
          done();
        });
  });
  
  it('gets posted resource', (done) => {
    request
        .get('/dogs/doberman')
        .end((err, response) => {
          assert.equal(response.text, post);
          done();
        });
  });
  
  
  it('puts second resource', (done) => {
    var postPoodle = '{"breed": "poodle"}';
    request
        .put('/dogs/poodle')
        .send(postPoodle)
        .end((err, response) => {
          var resMessage = JSON.parse(response.text).success;
          assert.equal(response.statusCode, 200);
          assert.equal(resMessage, 'poodle.json saved!');
          done();
        });
  });
  
  it ('lists all file names in api at path /dogs', done => {
    request
        .get('/dogs')
        .end((err, response) => {
          var resDogList = JSON.parse(response.text).dogs;
          assert.equal(resDogList.length, 2); 
          done();
        });
  });
  
  it('deletes posted resource', (done) => {
    request
        .del('/dogs/doberman')
        .end((err, response) => {
          var resMessage = JSON.parse(response.text).success;
          assert.equal('doberman.json removed!', resMessage);
          done();
        });
  });
  
  it('routes to 404 page when path is not recognized', (done) => {
    request
        .get('/random/path')
        .end((err, response) => {
          assert.equal(response.text, 'Cannot GET /random/path\n');
          done();
        });
  });
  
  after(done => {
    request
        .del('/dogs/poodle')
        .end(() => {
          done();
        });
        
  });
});
  
  
  

