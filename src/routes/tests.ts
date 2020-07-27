import { RequestHandler } from 'express';

import { wrap } from '../helper';

export const list: RequestHandler = wrap(async (req, res) => {
  return res.status(200).json({
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
  });
});
