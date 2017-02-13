const actions = require('../actions');


const conn = {};

function logBrowser(message) {
  console.log(`[BROWSER] :: ${message}`);
}

function logDesktop(message) {
  console.log(`[DESKTOP] :: ${message}`);
}

module.exports = (io) => {
  conn.desktop = io.of('/desktop');
  conn.browser = io.of('/browser');

  conn.desktop.on('connection', (socket) => {
      logDesktop('connected');

      socket.on(actions.DEKTOP_BROADCAST, (data) =>
          conn.browser.emit(actions.DEKTOP_BROADCAST, data));
  });

  conn.browser.on('connection', (socket) => {
      logBrowser('connected');

      socket.on(actions.MOUSE_MOVE, (pos) => {
          logBrowser("mouse move " + JSON.stringify(pos));
          conn.desktop.emit(actions.MOUSE_MOVE, pos)
      });
          
  });
}


