import env from './shared/env';
import config from './shared/config';
import Context from './context';
import { Context as ctx } from './context';
import Application from './application';

// TODO more handsome???
export default (async (): Promise<ctx> => {
  const context = await Context(config);
  context.initModels();
  await context.syncModels();
  await context.initCache();

  const app = new Application(env.SERVICE_HOST, env.SERVICE_PORT);
  await app.init();
  app.start({});

  return context;
})();
