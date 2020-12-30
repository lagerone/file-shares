import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../config';
import { logger } from '../logger';
import { LoggedInUser } from '../login/login-api-router';
import { getFilepathById } from './file-service';
import { addDownloadStat } from './stats-service';

const downloadFilesRouter = Router();

downloadFilesRouter.get(
  '/:token/:filepathId',
  asyncHandler(async (req, res) => {
    const filepath = await getFilepathById(req.params.filepathId);
    if (!filepath) {
      logger.debug(`Could not find file for id "${req.params.filepathId}".`);
      res.sendStatus(HttpStatusCodes.NOT_FOUND);
      return;
    }
    try {
      const jwtPayload = jwt.verify(
        req.params.token,
        config.jwtSecret
      ) as LoggedInUser;
      addDownloadStat(jwtPayload.username, filepath);
      res.download(filepath);
    } catch (error) {
      logger.error(error);
      res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
    }
  })
);

export { downloadFilesRouter };
