import { NextFunction, Request, Response } from 'express';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../config';
import { logger } from '../logger';

const getTokenFromAuthHeader = (authHeaderValue = '') => {
  return authHeaderValue.replace('Bearer ', '');
};

export const jwtAuth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authToken = getTokenFromAuthHeader(req.headers.authorization);

    try {
      const jwtPayload = jwt.verify(authToken, config.jwtSecret);
      res.locals.user = jwtPayload;
    } catch (error) {
      logger.error(error);
      res.sendStatus(HttpStatusCodes.UNAUTHORIZED);
      return;
    }

    next();
  };
};
