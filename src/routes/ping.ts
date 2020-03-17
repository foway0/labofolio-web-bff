import { RequestHandler } from 'express';

import { wrap, sequelize } from '../helper';

export const ping: RequestHandler = wrap(async (req, res) => {
  await sequelize.authenticate(req.ctx.getMysql());
  return res.status(200).send('pong');
});
