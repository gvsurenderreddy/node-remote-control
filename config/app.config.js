const os = require('os');
const env = process.env;

module.exports = {
  port: env.PORT || 5000,
  host: env.HOST || os.hostname(),
  broadcasting: {
    screenshotInterval: env.SCREENSHOT_INTERVAL || 1000 // 500 = 1/2 second
  }
};