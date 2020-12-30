import { Router } from 'express';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../config';

const loginApiRouter = Router();

export interface LoggedInUser {
  id: string;
  username: string;
}

interface User {
  id: string;
  username: string;
  password: string;
}

const users: User[] = [
  {
    id: '9d0257c8-3e52-43e0-949e-3eb042796fe2',
    username: 'lagerone',
    password: 'fjodor',
  },
  {
    id: '24312f1d-a174-40eb-8244-12b8b09636cf',
    username: 'jolly',
    password: 'jolly123',
  },
  {
    id: 'a6ff762a-947b-4af2-a1e0-7f9ceb3b9b53',
    username: 'mackan',
    password: 'pruttapa',
  },
  {
    id: '5e1b1fe6-b234-4718-bc27-a4c84168fc6d',
    username: 'miapia',
    password: 'milo',
  },
];

function getUserByUsernameAndPassword(
  username: string,
  password: string
): User | undefined {
  return users.find((u) => u.username === username && u.password === password);
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
