export interface MysqlConfig {
  database: string;
  username: string;
  password: string;
  options: object;
}

export interface DB {
  [key: string]: any;
}

export interface SSL {
  SSL_KEY?: string;
  SSL_CERT?: string;
}
