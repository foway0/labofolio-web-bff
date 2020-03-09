import { RequestHandler } from 'express';

import Context from '../index';
import { wrap, sequelize } from '../helper';

export const ping: RequestHandler = wrap(async (req, res) => {
  await sequelize.authenticate((await Context).getMysql());
  return res.status(200).send('pong');
});
