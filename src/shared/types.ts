import models from '../models';

export interface MysqlConfig {
  database: string;
  username: string;
  password: string;
  options: object;
}

export interface DB {
  [key: string]: any;
}

export interface DB {
  users?: typeof models.users.Users;
  blogs?: typeof models.blogs.Blogs;
  blog_snapshots?: typeof models.blog_snapshots.BlogSnapshots;
}

export interface SSL {
  SSL_KEY?: string;
  SSL_CERT?: string;
}
