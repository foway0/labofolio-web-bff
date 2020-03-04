import { RequestHandler } from 'express';

import Context from '../context';
import { wrap, SequelizeHelper } from '../helper';

export const list: RequestHandler = wrap(async (req, res) => {
  const User = Context.getDB().users;

  const options = {
    limit: req.query.limit,
    offset: req.query.offset
  };
  const result = await SequelizeHelper.findAndCountAll(User, options);

  return res.status(200).json(result);
});

export const create: RequestHandler = wrap(async (req, res) => {
  const User = Context.getDB().users;

  const options = {
    strategy_id: req.body.strategy_id,
    status: req.body.status,
    role_id: req.body.role_id,
    nickname: req.body.nickname,
    profile_url: req.body.profile_url
  };
  const result = await SequelizeHelper.create(User, options);

  return res.status(200).json(result);
});
