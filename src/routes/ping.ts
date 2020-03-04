import { RequestHandler } from 'express';

import Context from '../context';
import { wrap, SequelizeHelper } from '../helper';

export const ping: RequestHandler = wrap(async (req, res) => {
  await SequelizeHelper.authenticate(Context.getMysql());
  return res.status(200).send('pong');
});
