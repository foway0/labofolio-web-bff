// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var Hello_pb = require('./Hello_pb.js');

function serialize_hello_HelloReply(arg) {
  if (!(arg instanceof Hello_pb.HelloReply)) {
    throw new Error('Expected argument of type hello.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hello_HelloReply(buffer_arg) {
  return Hello_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hello_HelloRequest(arg) {
  if (!(arg instanceof Hello_pb.HelloRequest)) {
    throw new Error('Expected argument of type hello.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hello_HelloRequest(buffer_arg) {
  return Hello_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hello_RepeatHelloRequest(arg) {
  if (!(arg instanceof Hello_pb.RepeatHelloRequest)) {
    throw new Error('Expected argument of type hello.RepeatHelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hello_RepeatHelloRequest(buffer_arg) {
  return Hello_pb.RepeatHelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreeterService = exports.GreeterService = {
  sayHello: {
    path: '/hello.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: Hello_pb.HelloRequest,
    responseType: Hello_pb.HelloReply,
    requestSerialize: serialize_hello_HelloRequest,
    requestDeserialize: deserialize_hello_HelloRequest,
    responseSerialize: serialize_hello_HelloReply,
    responseDeserialize: deserialize_hello_HelloReply,
  },
  sayRepeatHello: {
    path: '/hello.Greeter/SayRepeatHello',
    requestStream: false,
    responseStream: true,
    requestType: Hello_pb.RepeatHelloRequest,
    responseType: Hello_pb.HelloReply,
    requestSerialize: serialize_hello_RepeatHelloRequest,
    requestDeserialize: deserialize_hello_RepeatHelloRequest,
    responseSerialize: serialize_hello_HelloReply,
    responseDeserialize: deserialize_hello_HelloReply,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
