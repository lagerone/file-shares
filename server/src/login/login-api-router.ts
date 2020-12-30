import { Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../config';

const loginApiRouter = Router();

export interface User {
  id: string;
  username: string;
}

function getUserByUsernameAndPassword(
  username: string,
  password: string
): User | null {
  if (username === 'lagerone' && password === 'fjodor') {
    return {
      id: '9d0257c8-3e52-43e0-949e-3eb042796fe2',
      username: 'lagerone',
    };
  }
  if (username === 'jolly' && password === 'jolly123') {
    return {
      id: '24312f1d-a174-40eb-8244-12b8b09636cf',
      username: 'jolly',
    };
  }
  if (username === 'mackan' && password === 'pruttapa') {
    return {
      id: 'a6ff762a-947b-4af2-a1e0-7f9ceb3b9b53',
      username: 'mackan',
    };
  }
  if (username === 'miapia' && password === 'milo') {
    return {
      id: '5e1b1fe6-b234-4718-bc27-a4c84168fc6d',
      username: 'miapia',
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
      username: user.username,
    },
    config.jwtSecret,
    { expiresIn: '1y' }
  );

  res.send({ token: signedJwtToken });
});

export { loginApiRouter };
