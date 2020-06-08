require('dotenv').config()
const http = require('http');
const app = require('./app');

const port = 8080
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`Api listening on port ${port}!`))

module.exports = app;
