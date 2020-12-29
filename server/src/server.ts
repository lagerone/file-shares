require('dotenv').config({ silent: true });

import http from 'http';
import { app } from './app';
import config from './config';
import { logger } from './logger';

(async () => {
  try {
    startWebServer();
  } catch (error) {
    logger.error(`Failed to run startup tasks. Reason: ${error}`);
  }
})();

function startWebServer() {
  const webserver = http.createServer(app).listen(config.httpPort, () => {
    logger.debug(
      `HTTP webserver started at http://localhost:${
        config.httpPort
      } in ${app.get('env')} mode.`
    );
  });

  webserver.on('error', (error) => {
    logger.error(`HTTP server crashed. Reason: ${error}`);
  });
}
