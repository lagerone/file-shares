import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import expressWinston from 'express-winston';
import winston from 'winston';
import config from './config';
import { downloadFilesRouter } from './downloads/download-files-router';
import { filesApiRouter } from './downloads/files-api-router';
import { loginApiRouter } from './login/login-api-router';
import { jwtAuth } from './middlewares/jwt-auth';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    meta: config.isProduction, // optional: control whether you want to log the meta data about the request (default to true)
    msg:
      'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    // ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  })
);

app.use('/api/login', loginApiRouter);
app.use('/downloads', downloadFilesRouter);
app.use('/api/files', jwtAuth(), filesApiRouter);
app.use(express.static(config.staticFilesPath));

app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  })
);

export { app };
