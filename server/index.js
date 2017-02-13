const config = require('../config').app;
const express = require('express');
const path = require('path');


const app = express();

// express config
app.use(express.static(path.resolve(__dirname, '../public')));

// send the index page
app.get('/', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../public/index.html')));

// create a new websocket server
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.set('origins', '*:*');

require('./comm_handler')(io);

// start the server
server.listen(config.port, () => {
    console.log(`server running on port ${config.port}`);
});