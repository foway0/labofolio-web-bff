export abstract class ViewModel {
  private _path: any;
  private _query: any;
  private _body: any;
  private _result: any;

  public addPath(path: any): this {
    this._path = path;
    return this;
  }

  public addQuery(query: any): this {
    this._query = query;
    return this;
  }

  public addBody(body: any): this {
    this._body = body;
    return this;
  }

  public addResult(result: any): void {
    this._result = result;
  }

  get path(): any {
    return this._path;
  }

  get query(): any {
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
