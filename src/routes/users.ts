import { RequestHandler } from 'express';
import { sprintf } from 'sprintf-js';

import constant from '../shared/constant';
import Context from '../index';
import { wrap, sequelize, redis } from '../helper';

export const list: RequestHandler = wrap(async (req, res) => {
  const User = (await Context).getDB().users;
  const options = {
    limit: req.query.limit,
    offset: req.query.offset
  };
  const result = await sequelize.findAndCountAll(User, options);

  return res.status(200).json(result);
});

export const create: RequestHandler = wrap(async (req, res) => {
  const User = (await Context).getDB().users;
  const cache = (await Context).getCache();
  const options = {
    strategy_id: req.body.strategy_id,
    status: req.body.status,
    role_id: req.body.role_id,
    nickname: req.body.nickname,
    profile_url: req.body.profile_url
  };
  const user = await sequelize.create(User, options);
  await redis.set(sprintf(constant.REDIS.USERS_PREFIX, user.id), user, cache);

  return res.status(200).json(user);
});

export const one: RequestHandler = wrap(async (req, res) => {
  const User = (await Context).getDB().users;
  const cache = (await Context).getCache();
  let user = await redis.get(
    sprintf(constant.REDIS.USERS_PREFIX, req.params.user_id),
    cache
  );

  if (!user) {
    user = await sequelize.findByPk(User, req.params.user_id);
    await redis.set(sprintf(constant.REDIS.USERS_PREFIX, user.id), user, cache);
  }

  return res.status(200).json(user);
});
