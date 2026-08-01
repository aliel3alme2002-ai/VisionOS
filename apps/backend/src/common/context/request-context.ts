import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestContextStore {
  readonly requestId: string;
  readonly correlationId: string;
  readonly traceId: string;
  readonly tenantId?: string | undefined;
  readonly userId?: string | undefined;
}

@Injectable()
export class RequestContext {
  private static readonly storage = new AsyncLocalStorage<RequestContextStore>();

  public static run<T>(store: RequestContextStore, callback: () => T): T {
    return this.storage.run(store, callback);
  }

  public static current(): RequestContextStore | undefined {
    return this.storage.getStore();
  }

  public get requestId(): string | undefined {
    return RequestContext.storage.getStore()?.requestId;
  }

  public get correlationId(): string | undefined {
    return RequestContext.storage.getStore()?.correlationId;
  }

  public get traceId(): string | undefined {
    return RequestContext.storage.getStore()?.traceId;
  }

  public get tenantId(): string | undefined {
    return RequestContext.storage.getStore()?.tenantId;
  }

  public get userId(): string | undefined {
    return RequestContext.storage.getStore()?.userId;
  }
}
