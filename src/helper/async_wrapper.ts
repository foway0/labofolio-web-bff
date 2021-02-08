import { RequestHandler, Request, Response, NextFunction } from 'express';

interface PromiseRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

export function wrap(fn: PromiseRequestHandler): RequestHandler {
  return (req, res, next) => fn(req, res, next).catch(next);
}
