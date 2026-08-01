import { DatabaseClient } from '../database/database-client.interface';

export class TransactionContext {
  public readonly transactionId: string;
  
  constructor(
    public readonly client: DatabaseClient,
    public readonly correlationId: string,
    public readonly requestContext?: any
  ) {
    this.transactionId = crypto.randomUUID();
  }
}
