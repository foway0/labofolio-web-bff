import { Request, Response } from 'express';
import grpc from 'grpc';

import { GreeterClient } from '../grpc_spec/Hello_grpc_pb';
import { HelloRequest } from '../grpc_spec/Hello_pb';
import constant from '../shared/constant';
import { wrap } from '../helper/async_wrapper';

const test = async (req: Request, res: Response) => {
  const client = new GreeterClient(
    'host.docker.internal:4000',
    //'localhost:4000',
    grpc.credentials.createInsecure()
  );
  const message = new HelloRequest();
  message.setName('HI');

  client.sayHello(message, (error, response) => {
    // TODO error handling
    res.status(constant.STATUS_CODE.OK).send(response.getMessage());
  });
};

export default {
  test: wrap(test),
};
