import io from "socket.io-client";
import {app} from '../config';
import actions from '../actions';

const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");

let oldMousePos = {x: 0, y: 0};

// connect to the server
const socket = io(`http://${app.host}:${app.port}/browser`);

socket.on('connect', () => {
    

    // draw the desktop
    socket.on(actions.DEKTOP_BROADCAST, (data) => {
        const arrayBuffer = new Uint8Array(data);
        const blob = new Blob([ arrayBuffer ], {type: 'image/png'});

        var URLCreator = window.URL || window.webkitURL;
        var imageUrl = URLCreator.createObjectURL(blob);

        var img = new Image();

        img.onload = function() {       

            // free memory  
            URL.revokeObjectURL(this.src); 
                 
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(this, 0, 0);
            
        }

        img.src = imageUrl; 
    });

     
    

});

// handle mouse move event
canvas.addEventListener('mousemove', function(event) {
    
    var pos = getMousePosition(canvas, event);
    if (
        Math.abs(pos.x - oldMousePos.x) > 5 ||
        Math.abs(pos.y - oldMousePos.y) > 5
    ) {            
        oldMousePos = pos;
        console.log(pos); 
        socket.emit(actions.MOUSE_MOVE, pos); 
    }
});

canvas.addEventListener('click', (event) => {
    const pos = getMousePosition(canvas, event);
    socket.emit(actions.LEFT_MOUSE_CLICK, pos);
})

function getMousePosition(canvas, event) { 
    // extract mouse position
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}


socket.on('disconnect', () => {
    console.log(' Browser Disconnected ');
})