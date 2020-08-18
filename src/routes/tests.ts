import { RequestHandler } from 'express';

import { wrap, redis } from '../helper';

export const list: RequestHandler = wrap(async (req, res) => {
  const cache = req.ctx.getCache();
  const key = 'tests';
  let result = await redis.get(cache, key);
  const tests = {
    Count: 2,
    Rows: [
      {
        Id: 1,
        Subject: 'hello',
        ContentMd: 'TODO',
      },
      {
        Id: 2,
        Subject: 'hello2',
        ContentMd: 'TODO2',
      },
    ],
  };

  if (!result) {
    await redis.set(cache, key, tests);
    result = tests;
  }

  return res.status(200).json(result);
});
