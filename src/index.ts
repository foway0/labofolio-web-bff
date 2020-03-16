import env from './shared/env';
import config from './shared/config';
import Context from './context';
import Application from './application';

// TODO more handsome???
(async (): Promise<void> => {
  const context = Context(config);
  await context.initStore();
  context.initModels();
  await context.syncModels();
  await context.initCache();

  const app = new Application(env.SERVICE_HOST, env.SERVICE_PORT, context);
  await app.init();
  app.start({});
})();
