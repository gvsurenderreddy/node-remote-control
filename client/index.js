const config = require('../config').app;
const socket = require('socket.io-client')(`http://${config.host}:${config.port}/desktop`);
const actions = require('../actions');
const robot = require('robotjs');
const fs = require('fs');
const path = require('path');

const screenSize = robot.getScreenSize();

let img;
let matrix = new Array(screenSize.width);

socket.on('connect', () => {
    
    
    setInterval(() => {
        img = robot.screen.capture();
        
        img.save("./screencapture.png");

        fs.readFile("./screencapture.png", (err, data) => {
            if(err) throw err;
            socket.emit(actions.DEKTOP_BROADCAST, data);
        });
        
        
        
    }, config.broadcasting.screenshotInterval);

    socket.on(actions.MOUSE_MOVE, (pos) => {
         robot.moveMouse(pos.x, pos.y);
    })

})
