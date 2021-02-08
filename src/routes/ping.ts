import { Request, Response } from 'express';

import constant from '../shared/constant';
import { wrap } from '../helper/async_wrapper';

const ping = async (req: Request, res: Response) => {
  res.status(constant.STATUS_CODE.OK).send('pong');
};

export default {
  ping: wrap(ping),
};
