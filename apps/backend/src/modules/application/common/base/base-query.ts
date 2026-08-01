import { RequestContext } from '../middleware/request-context';

export abstract class BaseQuery {
  public readonly context?: RequestContext;
  public readonly timestamp: number;

  protected constructor(context?: RequestContext) {
    if (context) {
      this.context = context;
    }
    this.timestamp = Date.now();
  }
}
