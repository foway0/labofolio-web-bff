const debug = process.env.DEBUG
  ? require('debug')('labofolio:middlewares/security_handler')
  : () => {};

import { Request } from 'express';

interface SecurityHandler {
  (
    req: Request,
    scopes: string[],
    schema: { [key: string]: any }
  ): Promise<boolean>;
}

const auth: SecurityHandler = async (req, scopes, schema) => {
  debug('execute auth');
  const auth = req.get('x-authorization');

  return auth === 'hoge';
};

export default {
  auth: auth,
};
