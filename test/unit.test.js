const assert = require('chai').assert;
const db = require('../src/database');

describe('database unit tests', () => {
  
  const content = 'test content';
 
  it('writes new file', done => {
    db.write('test.txt', content, (err, results) => {
      assert.equal('test.txt saved!', results);
      done();
    });
  });
  
  it('reads said file', done => {
    db.read('test.txt', (err, results) => {
      assert.equal(content, results);
      done();
    });
  });
  
  it('deletes said file', done => {
    db.destroy('test.txt', (err, message) => {
      assert.equal('test.txt removed!', message);
      done();
    });
  });
  
});