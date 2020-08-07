import { RequestHandler } from 'express';

import { wrap } from '../helper';

export const list: RequestHandler = wrap(async (req, res) => {
  return res.status(200).json({
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
  });
});
