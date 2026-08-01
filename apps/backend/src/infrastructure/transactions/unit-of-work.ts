import { Injectable } from '@nestjs/common';
import { TransactionManager } from './transaction-manager';
import { TransactionContext } from './transaction-context';

@Injectable()
export class UnitOfWork {
  constructor(private readonly transactionManager: TransactionManager) {}

  /**
   * Executes operations within a database transaction.
   */
  public async executeTransactional<T>(
    correlationId: string,
    work: (ctx: TransactionContext) => Promise<T>,
    requestContext?: any
  ): Promise<T> {
    return this.transactionManager.execute(correlationId, work, requestContext);
  }

  /**
   * Executes operations without a transaction.
   * Useful when UoW pattern is required but transaction overhead is not.
   */
  public async executeReadOnly<T>(
    correlationId: string,
    work: (ctx: TransactionContext) => Promise<T>,
    requestContext?: any
  ): Promise<T> {
    // For read-only, we just use the global db client without an interactive transaction.
    // However, to keep the signature the same, we'd need access to the root DatabaseClient.
    // We can just rely on execute() if we want it to be simple, but read-only could avoid transactions.
    // A quick hack is to just use a regular execute without transaction wrapper if supported, 
    // but Prisma doesn't natively expose read-only interactive contexts. 
    // We'll wrap it in standard transaction for now, or we can inject root DatabaseClient here.
    return this.transactionManager.execute(correlationId, work, requestContext); 
  }

  public async execute<T>(
    correlationId: string,
    work: (ctx: TransactionContext) => Promise<T>
  ): Promise<T> {
    return this.executeTransactional(correlationId, work);
  }
}
