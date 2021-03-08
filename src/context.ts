const debug = process.env.DEBUG
  ? require('debug')('labofolio:context')
  : () => {};

import * as path from 'path';
import env from './shared/env';

class Context {
  private _config!: Readonly<any>;

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    this._config = require(path.join(
      __dirname,
      'shared',
      'config',
      env.SERVICE_MODE
    ));
  }

  private get config(): Readonly<any> {
    return this._config;
  }

  get controllerPath(): string {
    if (this.config.mock) {
      debug('mock on');
      return path.join(__dirname, 'api', 'mock');
    } else {
      debug('routes on');
      return path.join(__dirname, 'api', 'routes');
    }
  }

  get oasPath(): string {
    return path.join(__dirname, 'api_specs', 'api.yaml');
  }
}

export default new Context();
