import { RequestHandler } from 'express';
import { GreeterClient } from '../grpc_spec/Hello_grpc_pb';
import grpc from 'grpc';
import { HelloRequest } from '../grpc_spec/Hello_pb';

export const test: RequestHandler = async (req, res) => {
  const client = new GreeterClient(
    'host.docker.internal:4000',
    //'localhost:4000',
    grpc.credentials.createInsecure()
  );
  const message = new HelloRequest();
  message.setName('HI');

  return client.sayHello(message, (error, response) => {
    res.status(200).send(response.getMessage());
  });
};
