import { ViewModel } from './base';
import { test } from '../services';

export class TestViewModel extends ViewModel {
  async helloWorld(): Promise<void> {
    this.addResult(await test.hi(this));
  }
}
