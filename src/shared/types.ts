export interface Config {
  mysql: MysqlConfig;
  redis: RedisConfig[];
}

export interface MysqlConfig {
  database: string;
  username: string;
  password: string;
  options: object;
}

export interface RedisConfig {
  host: string;
  port: number;
}

export interface DB {
  [key: string]: any;
}

export interface SSL {
  SSL_KEY?: string;
  SSL_CERT?: string;
}
