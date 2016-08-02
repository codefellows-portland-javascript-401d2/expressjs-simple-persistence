const server = require('./src/server');
const port = 8080;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});