const debug = process.env.DEBUG
  ? require('debug')('labofolio:application')
  : () => {};

import http from 'http';
import express from 'express';
import { middleware } from 'express-openapi-validator';
import constant from './shared/constant';
import securityHandler from './middlewares/security_handler';
import context from './context';

class Application {
  private readonly _port: number;
  private readonly _app: express.Application = express();
  private _server?: http.Server;

  constructor(port: number) {
    this._port = port;
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
    // TODO validate
    this.app.use(
      middleware({
        apiSpec: context.oasPath,
        operationHandlers: context.controllerPath,
        validateSecurity: {
          handlers: securityHandler,
        },
      })
    );
  }

  get port(): number {
    return this._port;
  }

  get app(): express.Application {
    return this._app;
  }
}

export default Application;
