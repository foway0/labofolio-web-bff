const debug = process.env.DEBUG
  ? require('debug')('labofolio:application')
  : () => {};

import http from 'http';
import express from 'express';
import constant from './shared/constant';

class Application {
  private readonly port: number;
  private readonly app: express.Application;
  private _server?: http.Server;

  constructor(port: number) {
    this.port = port;

    this.app = express();
  }

  public start(): void {
    this._server = http.createServer(this.app);
    this._server.listen(this.port, () => {
      debug(`listening on :${this.port}!`);
    });
  }

  public async init(): Promise<void> {
    this.app.get('/favicon.ico', (req, res) =>
      res.sendStatus(constant.STATUS_CODE.NO_CONTENT)
    );
    this.app.use((req, res, next) => {
      debug(`endpoint:${this.port}${req.url}`);
      return next();
    });

    // add route
    this.app.get('/ping', (req, res) => {
      return res.status(200).send('pong');
    });
  }
}

export default Application;
