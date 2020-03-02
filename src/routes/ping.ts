import { RequestHandler } from 'express';

export const ping: RequestHandler = async (req, res, next): Promise<void> => {
  res.status(200).send('pong');
};
