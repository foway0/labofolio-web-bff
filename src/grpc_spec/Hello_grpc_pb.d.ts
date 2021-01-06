// package: hoge
// file: Hello.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as Hello_pb from "./Hello_pb";

interface IGreeterService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sayHello: IGreeterService_ISayHello;
    sayRepeatHello: IGreeterService_ISayRepeatHello;
}

interface IGreeterService_ISayHello extends grpc.MethodDefinition<Hello_pb.HelloRequest, Hello_pb.HelloReply> {
    path: "/hoge.Greeter/SayHello";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<Hello_pb.HelloRequest>;
    requestDeserialize: grpc.deserialize<Hello_pb.HelloRequest>;
    responseSerialize: grpc.serialize<Hello_pb.HelloReply>;
    responseDeserialize: grpc.deserialize<Hello_pb.HelloReply>;
}
interface IGreeterService_ISayRepeatHello extends grpc.MethodDefinition<Hello_pb.RepeatHelloRequest, Hello_pb.HelloReply> {
    path: "/hoge.Greeter/SayRepeatHello";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<Hello_pb.RepeatHelloRequest>;
    requestDeserialize: grpc.deserialize<Hello_pb.RepeatHelloRequest>;
    responseSerialize: grpc.serialize<Hello_pb.HelloReply>;
    responseDeserialize: grpc.deserialize<Hello_pb.HelloReply>;
}

export const GreeterService: IGreeterService;

export interface IGreeterServer {
    sayHello: grpc.handleUnaryCall<Hello_pb.HelloRequest, Hello_pb.HelloReply>;
    sayRepeatHello: grpc.handleServerStreamingCall<Hello_pb.RepeatHelloRequest, Hello_pb.HelloReply>;
}

export interface IGreeterClient {
    sayHello(request: Hello_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: Hello_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: Hello_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Hello_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayHello(request: Hello_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Hello_pb.HelloReply) => void): grpc.ClientUnaryCall;
    sayRepeatHello(request: Hello_pb.RepeatHelloRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<Hello_pb.HelloReply>;
    sayRepeatHello(request: Hello_pb.RepeatHelloRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<Hello_pb.HelloReply>;
}

export class GreeterClient extends grpc.Client implements IGreeterClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public sayHello(request: Hello_pb.HelloRequest, callback: (error: grpc.ServiceError | null, response: Hello_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: Hello_pb.HelloRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: Hello_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayHello(request: Hello_pb.HelloRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: Hello_pb.HelloReply) => void): grpc.ClientUnaryCall;
    public sayRepeatHello(request: Hello_pb.RepeatHelloRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<Hello_pb.HelloReply>;
    public sayRepeatHello(request: Hello_pb.RepeatHelloRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<Hello_pb.HelloReply>;
}
