import config from './shared/config';
import context from './context';

(async (): Promise<void> => {
  await context.initStore(config.mysql);
  context.initModels();
  await context.syncModels();
})();
