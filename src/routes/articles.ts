import { Request, Response } from 'express';

import constant from '../shared/constant';
import { wrap } from '../helpers/async_wrapper';

const list = async (req: Request, res: Response) => {
  res.status(constant.STATUS_CODE.OK).json({
    count: 9999,
    rows: [
      {
        id: 1,
        subject: 'Hello World!',
        content: '<div><h1>HI!</h1></div>',
      },
    ],
  });
};

const one = async (req: Request, res: Response) => {
  res.status(constant.STATUS_CODE.OK).json({
    id: 1,
    subject: 'Hello World!',
    content: '<div><h1>HI!</h1></div>',
    comments: [
      {
        id: 1,
        name: 'hoge',
        content: 'hello guys!',
        cratedAt: 20292848,
      },
    ],
  });
};

export default {
  list: wrap(list),
  one: wrap(one),
};
