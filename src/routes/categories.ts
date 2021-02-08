import { Request, Response } from 'express';

import { wrap } from '../helper/async_wrapper';
import constant from '../shared/constant';

const list = async (req: Request, res: Response) => {
  res.status(constant.STATUS_CODE.OK).json([
    {
      id: 1,
      name: 'node',
      description: 'node lecture',
    },
    {
      id: 2,
      name: 'game',
      description: 'game play video',
    },
  ]);
};

export default {
  list: wrap(list),
};
