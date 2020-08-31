import { RequestHandler } from 'express';
import { wrap, sequelize } from '../helper';

export const list: RequestHandler = wrap(async (req, res, next) => {
  const Blog = req.ctx.getDB().blogs;
  const options = {
    limit: Number(req.query.limit),
    offset: Number(req.query.offset),
  };
  const result = await sequelize.findAndCountAll(Blog, options);

  return res.status(200).json(result);
});

export const create: RequestHandler = wrap(async (req, res, next) => {
  const Blog = req.ctx.getDB().blogs;
  const options = {
    user_id: req.body.user_id,
    status: req.body.status,
    subject: req.body.subject,
    content_md: req.body.content_md,
    content_html: req.body.content_html,
    content_text: req.body.content_text,
  };
  const blog = await sequelize.create(Blog, options);

  return res.status(200).json(blog);
});

export const update: RequestHandler = wrap(async (req, res, next) => {
  const Blog = req.ctx.getDB().blogs;

  const options = {
    where: { id: req.params.blog_id },
  };
  await sequelize.update(Blog, req.body, options);

  return res.status(204).end();
});
