import grpc from 'grpc';

import { GreeterClient } from '../grpc_specs/Hello_grpc_pb';
import { HelloRequest, HelloReply } from '../grpc_specs/Hello_pb';

import { promisify } from 'util';

type params = {
  query: any;
};

export const hi = async ({ query }: params): Promise<string> => {
  // TODO config setting + grpc client helper化
  const client = new GreeterClient(
    'host.docker.internal:3001',
    grpc.credentials.createInsecure()
  );
  const message = new HelloRequest();
  message.setName(query.name || 'anonymous');

  // TODO error Handler?
  const result: HelloReply = await promisify<HelloRequest, HelloReply>(
    client.sayHello
  ).bind(client)(message);
  return result.getMessage();
};
