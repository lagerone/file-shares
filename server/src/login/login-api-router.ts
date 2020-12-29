import { Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../config';

const loginApiRouter = Router();

interface User {
  id: string;
}

function getUserByUsernameAndPassword(
  username: string,
  password: string
): User | null {
  if (username === 'lagerone' && password === 'fjodor') {
    return {
      id: '9d0257c8-3e52-43e0-949e-3eb042796fe2',
    };
  }
  return null;
}

loginApiRouter.post('/', (req, res) => {
  const { username = '', password = '' } = req.body;

  const user = getUserByUsernameAndPassword(username, password);

  if (!user) {
    res.sendStatus(HttpStatusCodes.FORBIDDEN);
    return;
  }

  const signedJwtToken = jwt.sign(
    {
      userId: user.id,
    },
    config.jwtSecret,
    { expiresIn: '1y' }
  );

  res.send({ token: signedJwtToken });
});

export { loginApiRouter };
