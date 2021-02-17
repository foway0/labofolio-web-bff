import { Request, Response } from 'express';

import constant from '../../shared/constant';
import { wrap } from '../../helpers/async_wrapper';
import { TestViewModel } from '../../view_models/testVM';

const test = async (req: Request, res: Response): Promise<void> => {
  const viewModel = new TestViewModel().addQuery(req.query);

  await viewModel.helloWorld();

  const result = viewModel.outPut();
  res.status(constant.STATUS_CODE.OK).send(result);
};

export default {
  test: wrap(test),
};
