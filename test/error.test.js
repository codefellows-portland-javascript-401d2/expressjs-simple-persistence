const assert = require('chai').assert;
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');

chai.use(chaiHttp);

describe('error handling', () => {
    
    var req = chai.request(server);
    var testPost = '{"breed": "boxer"}';
    
    before(done=> {
        req.post('/dogs')
           .send(testPost)
           .end((err, res) => {
               done();
           });        
    });
    
    it('clean error on GET resource not found', done => {
       req.get('/dogs/tabby')
              .end((err, res) => {
                  assert.ok(err);
                  done();
              });
    });
    
    it('clean error on DELETE resource not existing', done => {
       req.del('/dogs/tabby')
              .end((err, res) => {
                  assert.ok(err);
                  done();
              });
    });
    
    it('server is still running', done => {
        req.get('/dogs')
            .end((err, res) => {
                var dogList = JSON.parse(res.text).dogs;
                assert.equal(dogList.length, 1);
                done();
           });
    });
    
    after(done => {
        req.del('/dogs/boxer')
           .end((err, res) => {
              done(); 
           });
    });
});