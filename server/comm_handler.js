const actions = require('../actions');

const conn = {};

function logBrowser(message) {
  console.log(`[BROWSER] :: ${message}`);
}

function logDesktop(message) {
  console.log(`[DESKTOP] :: ${message}`);
}

module.exports = (io) => {
  // using namespaces to seperate communication channels
  conn.desktop = io.of('/desktop');
  conn.browser = io.of('/browser');

  conn.desktop.on('connection', (socket) => {
      logDesktop('connected');

      socket.on(actions.DEKTOP_BROADCAST, data =>
          conn.browser.emit(actions.DEKTOP_BROADCAST, data));
  });

  conn.browser.on('connection', (socket) => {
      logBrowser('connected');

      socket.on(actions.MOUSE_MOVE, pos => {
          logBrowser("mouse move " + JSON.stringify(pos));
          conn.desktop.emit(actions.MOUSE_MOVE, pos)
      });

      socket.on(actions.LEFT_MOUSE_CLICK, pos => {
        logBrowser("left mouse click " + JSON.stringify(pos));
        conn.desktop.emit(actions.LEFT_MOUSE_CLICK, pos);
      })

      socket.on(actions.RIGHT_MOUSE_CLICK, pos => {
        logBrowser("right mouse click " + JSON.stringify(pos));
        conn.desktop.emit(actions.RIGHT_MOUSE_CLICK, pos);
      })
          
  });
}


