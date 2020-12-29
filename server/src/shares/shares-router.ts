import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import fsWithCallbacks from 'fs';
import HttpStatusCodes from 'http-status-codes';
import path from 'path';
import config from '../config';
import { logger } from '../logger';

const fs = fsWithCallbacks.promises;

export async function pathExists(inputPath: string) {
  try {
    await fs.access(inputPath);
    return true;
  } catch (error) {
    return false;
  }
}
const sharesRouter = Router();

sharesRouter.get(
  '/:dirname/:filename',
  asyncHandler(async (req, res) => {
    const { dirname, filename } = req.params;
    const filepath = path.join(config.sharedVideoFilesPath, dirname, filename);
    const fileExists = await pathExists(filepath);
    if (!fileExists) {
      logger.debug(`Could not find file at "${filepath}".`)
      res.sendStatus(HttpStatusCodes.NOT_FOUND);
      return;
    }
    res.download(filepath);
  })
);

export { sharesRouter };
