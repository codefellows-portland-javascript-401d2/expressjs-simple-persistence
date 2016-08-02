const store = require ('../lib/store.js');
const assert = require('chai').assert;

describe('Store Module Test',() => {

  const obj1 = {
    'title' : 'Spring Chickens Festival',
    'year' : '2014',
    'location' : 'Omaha',
    'interests' : 'chickens'
  };

  const obj2 = {
    'title' : 'Popcorn Festival',
    'year' : '2015',
    'location' : 'Enfield',
    'interests' : 'popcorn',
    'resource' : 'popcorn_festival'
  };

  describe('On create', () =>{

    it('Writes to json file and returns an object', ( done ) =>{
      store.create(obj1)
      .then(data => {
        assert.equal(data.title, 'Spring Chickens Festival');
        done();
      });
    });

  });

  describe('On read', () =>{

    it('Returns an array of objects when given an array of resources', ( done ) =>{
      store.read(['spring_chickens_festival'])
      .then( data =>{
        assert.isOk(data instanceof Array);
        assert.isOk(data[0] instanceof Object);
        done();
      });
    });

    it('Returns an array of resources when given an empty array', (done) =>{
      store.read([])
      .then( data =>{
        assert.isOk(data instanceof Array);
        done();
      });
    });
  });

  describe('On update', () =>{

    it('Renames a filename and resource and returns an object', (done) =>{
      store.update('spring_chickens_festival', obj2)
      .then( data => {
        assert.equal(data.resource, 'popcorn_festival');
        done();
      });
    });

  });

  describe('On delete', () =>{

    it('Returns a delete message', (done) =>{
      store.delete('popcorn_festival')
      .then( data => {
        assert.equal(data.message, 'deleted popcorn_festival');
        done();
      });
    });

  });
});
