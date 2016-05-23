const store = require ('../lib/store.js');
const assert = require('chai').assert;

describe('Store module',() => {

  describe('On create', () =>{

    it('Writes to json file and returns an object', ( done ) =>{
      store.create({title:'hisbook', pub_year:'1973'})
      .then(data => {
        assert.isOk(data);
        done();
      })
      .catch(error =>{
        assert.isOk(error);
        done();
      });
    });

  });

  describe('On read', () =>{

    it('Returns an array of objects when given an array of resources', ( done ) =>{
      store.read(['hisbook_1973'])
      .then( data =>{
        assert.equal(data.length, 2);
        done();
      })
      .catch( error =>{
        assert.isOk(error);
        done();
      });

    });


    it('Returns an array of resources when given an empty array', (done) =>{
      store.read([])
      .then( data =>{
        assert.isOk(data);
        done();
      })
      .catch( error =>{
        assert.isOk(error);
        done();
      });
    });
  });

  describe('On update', () =>{

    it('renames a filename and resource and returns an object', (done) =>{
      store.update('herbook_1986', {title:'herbook', pub_year:'2008', resource:'herbook_2008'})
      .then( data => {
        assert.isOk(data);
        done();
      })
      .catch( err => {
        assert.isOk(err);
        done();
      });
    });

  });

  describe('On delete', () =>{

    it('Returns a delete message', (done) =>{
      store.delete('herbook_2008')
      .then( data => {
        assert.equal(data.message, 'deleted herbook_2008');
        done();
      })
      .catch( err => {
        assert.isOk(err);
        done();
      });
    });

  });

});
