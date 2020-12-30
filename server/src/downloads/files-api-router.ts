import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { getDownloadableFileObjects } from './file-service';

const filesApiRouter = Router();

filesApiRouter.get(
  '/',
  asyncHandler(async (_req, res) => {
    res.send({ files: getDownloadableFileObjects() });
  })
);

export { filesApiRouter };
