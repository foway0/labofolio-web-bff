import { RequestHandler } from 'express';

import context from '../context';
import { wrap, SequelizeHelper } from '../helper';

export const ping: RequestHandler = wrap(async (req, res) => {
  await SequelizeHelper.authenticate(context.getMysql());
  return res.status(200).send('pong');
});
