import errorHandler from './middleware/error_handler';

const debug = process.env.DEBUG
  ? require('debug')('labofolio:application')
  : () => {};

import * as http from 'http';
import * as https from 'https';
import express from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import * as path from 'path';

import { SSL } from './shared/types';

class Application {
  private readonly host: string;
  private readonly port: number;
  private readonly app: express.Application;
  private _server?: https.Server | http.Server;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;

    this.app = express();
  }

  public start(env: SSL): void {
    if (env.SSL_CERT && env.SSL_KEY) {
      const options = {
        key: env.SSL_KEY,
        cert: env.SSL_CERT
      };

      this._server = https.createServer(options, this.app);
    } else {
      this._server = http.createServer(this.app);
    }
    this._server.listen(this.port, this.host, () => {
      debug(`${this.host}:${this.port} in on!`);
    });
  }

  public async init(): Promise<void> {
    this.app.use((req, res, next) => {
      debug(`${this.host}:${this.port}${req.url}`);
      next();
    });

    await new OpenApiValidator({
      apiSpec: path.join(__dirname, './api_specs/api.yaml'),
      validateRequests: true,
      validateResponses: true,
      operationHandlers: path.join(__dirname)
    }).install(this.app);

    // error handler
    this.app.use(errorHandler);
  }
}

export default Application;