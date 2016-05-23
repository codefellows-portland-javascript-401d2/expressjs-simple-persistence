const fs = require('fs');
const mkdirp = require('mkdirp');
const db = {};

db.directory = './data';

db.createDir = (callback) => {
  mkdirp('./data', (err) => {
    if (err) callback(err);
    callback(null, '/data created in project folder');
  });
};

db.fetchAll = (callback) => {
  fs.readdir(db.directory, function(err, files) {
    if (err) callback(err);
    var fileNames = files.map(x => {
      var y = x.split('.'); 
      return y[0];
    });
    callback(null, fileNames);
  });
};

db.read = (file, callback) => {
  fs.readFile(`${db.directory}/${file}`,(err, contents) => {
    if (err) callback(err);
    callback(null, contents);
  });
};

db.write = (newFile, content, callback) => {
  fs.writeFile(`${db.directory}/${newFile}`, content, (err) => {
    if (err) callback(err);
    callback(null, `${newFile} saved!`);
  });
};

db.destroy = (path, callback) => {
  fs.unlink(`${db.directory}/${path}`, (err) => {
    if (err) callback(err);
    callback(null, `${path} removed!`);
  });
};

module.exports = db;
