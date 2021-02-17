import grpc from 'grpc';

import { GreeterClient } from '../grpc_specs/Hello_grpc_pb';
import { HelloRequest } from '../grpc_specs/Hello_pb';

type params = {
  query: any;
};

export const hi = ({ query }: params): Promise<any> => {
  // TODO
  const client = new GreeterClient(
    'host.docker.internal:4000',
    //'localhost:4000',
    grpc.credentials.createInsecure()
  );
  const message = new HelloRequest();
  message.setName(query.name || 'anonymous');

  // TODO more handsome ?
  // TODO add ono
  return new Promise((resolve, reject) => {
    client.sayHello(message, (error, response) => {
      if (error) {
        return reject(error);
      }

      return resolve(response.getMessage());
    });
  });
};
