const chai = require('chai');
const chaihttp = require('chai-http');
const httpStart = require('../lib/http-start');
const app = require('../lib/server');
const assert = chai.assert;

chai.use(chaihttp);

describe('End to End Test', () => {


  const request = chai.request(httpStart(app, 8080));

  const obj1 = {
    'title' : 'International Jugglers Festival',
    'year' : '2016',
    'location' : 'Quebec City',
    'interests' : 'juggling'
  };

  const obj2 = {
    'title' : 'Tiny Pictures Film Festival',
    'year' : '2014',
    'location' : 'Beloit',
    'interests' : 'film, tiny things',
    'resource' : 'tiny_pictures_film_festival'
  };


  describe('Post', () => {

    it('Create a new festival entry, returns JSON object with resource ID', done => {
      request
      .post('/')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(obj1))
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(JSON.parse(res.text).interests, 'juggling');
        assert.equal(JSON.parse(res.text).resource, 'international_jugglers_festival');
        done();
      });
    });

  });

  describe('Get', () => {

    it('No resource given, returns a list of resources', done => {
      request
      .get('/')
      .end((req, res) => {
        assert.equal(res.statusCode, 200);
        assert.ok(res.text);
        done();
      });
    });

    it('When given a resource, returns all details', done => {
      request
      .get('/international_jugglers_festival')
      .end((req, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(JSON.parse(res.text).interests, 'juggling');
        done();
      });
    });

  });

  describe('Put', () => {

    it('Updates an entry with a given resource ID', done => {
      request
      .put('/international_jugglers_festival')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(obj2))
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(JSON.parse(res.text).interests, 'film, tiny things');
        done();
      });
    });

  });

  describe('Delete', () => {

    it('Delete an item with a given resource ID', done => {
      request
      .delete('/tiny_pictures_film_festival')
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(JSON.parse(res.text).message, 'deleted tiny_pictures_film_festival');
        done();
      });
    });

  });
});
