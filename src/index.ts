import Application from './application';
import env from './shared/env';

const bootstrap = async (): Promise<void> => {
  const app = new Application(env.SERVICE_PORT);
  await app.init();
  app.start();
};

(async (): Promise<void> => {
  await bootstrap();
})();
