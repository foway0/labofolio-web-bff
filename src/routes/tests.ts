import { RequestHandler } from 'express';

import { wrap, redis } from '../helper';

export const list: RequestHandler = wrap(async (req, res) => {
  const cache = req.ctx.getCache();
  const key = 'tests';
  let result = await redis.get(cache, key);
  const tests = {
    count: 2,
    rows: [
      {
        id: 1,
        subject: 'hello',
        content_md: 'TODO',
      },
      {
        id: 2,
        subject: 'hello2',
        content_md: 'TODO2',
      },
    ],
  };

  if (!result) {
    await redis.set(cache, key, tests);
    result = tests;
  }

  return res.status(200).json(result);
});
