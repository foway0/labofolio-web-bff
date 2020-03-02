import models from '../models';

export interface MysqlConfig {
  database: string;
  username: string;
  password: string;
  options: object;
}

export interface DB {
  users?: typeof models.users.Users;
  blogs?: typeof models.blogs.Blogs;
}
