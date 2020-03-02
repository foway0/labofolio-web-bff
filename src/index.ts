import env from './shared/env';
import config from './shared/config';
import Context from './context';
import Application from './application';

(async (): Promise<void> => {
  await Context.initStore(config.mysql);
  Context.initModels();
  await Context.syncModels();

  const app = new Application(env.SERVICE_HOST, env.SERVICE_PORT);
  await app.init();
  app.start({});
})();
