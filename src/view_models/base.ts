import { Query, PathParams } from 'express-serve-static-core';

export abstract class ViewModel {
  private _path!: PathParams;
  private _query!: Query;
  private _body: any;
  private _result: any;

  public addPath(path: PathParams): this {
    this._path = path;
    return this;
  }

  public addQuery(query: Query): this {
    this._query = query;
    return this;
  }

  // TODO any?
  public addBody(body: any): this {
    this._body = body;
    return this;
  }

  public addResult(result: any): void {
    this._result = result;
  }

  // TODO any?
  get path(): PathParams {
    return this._path;
  }

  get query(): Query {
    return this._query;
  }

  get body(): any {
    return this._body;
  }

  private get result(): any {
    return this._result;
  }

  public outPut(): any {
    return this.result;
  }
}
