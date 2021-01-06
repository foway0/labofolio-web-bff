// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var Hello_pb = require('./Hello_pb.js');

function serialize_hoge_HelloReply(arg) {
  if (!(arg instanceof Hello_pb.HelloReply)) {
    throw new Error('Expected argument of type hoge.HelloReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hoge_HelloReply(buffer_arg) {
  return Hello_pb.HelloReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hoge_HelloRequest(arg) {
  if (!(arg instanceof Hello_pb.HelloRequest)) {
    throw new Error('Expected argument of type hoge.HelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hoge_HelloRequest(buffer_arg) {
  return Hello_pb.HelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hoge_RepeatHelloRequest(arg) {
  if (!(arg instanceof Hello_pb.RepeatHelloRequest)) {
    throw new Error('Expected argument of type hoge.RepeatHelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hoge_RepeatHelloRequest(buffer_arg) {
  return Hello_pb.RepeatHelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreeterService = exports.GreeterService = {
  sayHello: {
    path: '/hoge.Greeter/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: Hello_pb.HelloRequest,
    responseType: Hello_pb.HelloReply,
    requestSerialize: serialize_hoge_HelloRequest,
    requestDeserialize: deserialize_hoge_HelloRequest,
    responseSerialize: serialize_hoge_HelloReply,
    responseDeserialize: deserialize_hoge_HelloReply,
  },
  sayRepeatHello: {
    path: '/hoge.Greeter/SayRepeatHello',
    requestStream: false,
    responseStream: true,
    requestType: Hello_pb.RepeatHelloRequest,
    responseType: Hello_pb.HelloReply,
    requestSerialize: serialize_hoge_RepeatHelloRequest,
    requestDeserialize: deserialize_hoge_RepeatHelloRequest,
    responseSerialize: serialize_hoge_HelloReply,
    responseDeserialize: deserialize_hoge_HelloReply,
  },
};

exports.GreeterClient = grpc.makeGenericClientConstructor(GreeterService);
