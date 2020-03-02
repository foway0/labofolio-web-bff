const debug = process.env.DEBUG
  ? require('debug')('labofolio:error_handler')
  : () => {};

import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  debug('---------');
  debug(err);
  debug('---------');

  // Will get here
  if (err.status && err.status === 404) {
    return res.status(404).send('what??? (╯°□°）╯︵ ┻━┻');
  } else if (err.status) {
    // format errors
    return res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors
    });
  } else {
    return res.status(503).end();
  }
};

export default errorHandler;
