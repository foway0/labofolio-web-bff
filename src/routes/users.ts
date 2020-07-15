import { RequestHandler } from 'express';
import { sprintf } from 'sprintf-js';
import ono from '@jsdevtools/ono';

import constant from '../shared/constant';
import { wrap, sequelize, redis } from '../helper';

export const list: RequestHandler = wrap(async (req, res) => {
  const User = req.ctx.getDB().users;
  const options = {
    limit: Number(req.query.limit),
    offset: Number(req.query.offset),
  };
  const result = await sequelize.findAndCountAll(User, options);

  return res.status(200).json(result);
});

export const create: RequestHandler = wrap(async (req, res) => {
  const User = req.ctx.getDB().users;
  const cache = req.ctx.getCache();
  const options = {
    strategy_id: req.body.strategy_id,
    status: req.body.status,
    role_id: req.body.role_id,
    nickname: req.body.nickname,
    profile_url: req.body.profile_url,
  };
  const user = await sequelize.create(User, options);
  await redis.set(cache, sprintf(constant.REDIS.USERS_PREFIX, user.id), user);

  return res.status(200).json(user);
});

export const one: RequestHandler = wrap(async (req, res) => {
  const User = req.ctx.getDB().users;
  const cache = req.ctx.getCache();
  let user = await redis.get(
    cache,
    sprintf(constant.REDIS.USERS_PREFIX, req.params.user_id)
  );

  if (!user) {
    user = await sequelize.findByPk(User, req.params.user_id);
    if (!user) throw ono({ status: 404, errors: 'NOT FOUND' }, `empty data`);
    await redis.set(cache, sprintf(constant.REDIS.USERS_PREFIX, user.id), user);
  }

  return res.status(200).json(user);
});

export const update: RequestHandler = wrap(async (req, res) => {
  if (
    !req.body.status &&
    !req.body.role_id &&
    !req.body.nickname &&
    !req.body.profile_url
  ) {
    throw ono(
      { status: 400, errors: 'FIXME' },
      `request.body requires properties at least one of them`
    );
  }

  const User = req.ctx.getDB().users;
  const cache = req.ctx.getCache();

  const options = {
    where: { id: req.params.user_id },
  };
  await sequelize.update(User, req.body, options);
  await redis.del(
    cache,
    sprintf(constant.REDIS.USERS_PREFIX, req.params.user_id)
  );

  return res.status(204).end();
});
