import env from './env';

export default Object.freeze({
  mysql: {
    database: env.MYSQL_DATABASE,
    username: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    options: {
      dialect: 'mysql',
      timezone: '+09:00',
      host: env.MYSQL_HOST,
    },
  },
  redis: [
    { host: env.REDIS_HOST, port: 7000 },
    { host: env.REDIS_HOST, port: 7001 },
    { host: env.REDIS_HOST, port: 7002 },
    { host: env.REDIS_HOST, port: 7003 },
    { host: env.REDIS_HOST, port: 7004 },
    { host: env.REDIS_HOST, port: 7005 },
  ],
});
