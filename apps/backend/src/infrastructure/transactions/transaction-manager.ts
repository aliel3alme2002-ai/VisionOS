import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CLIENT } from '../database/prisma.module';
import { DatabaseClient } from '../database/database-client.interface';
import { TransactionContext } from './transaction-context';

@Injectable()
export class TransactionManager {
  constructor(@Inject(DATABASE_CLIENT) private readonly db: DatabaseClient) {}

  public async execute<T>(
    correlationId: string,
    work: (ctx: TransactionContext) => Promise<T>,
    requestContext?: any
  ): Promise<T> {
    return this.db.client.$transaction(async (prismaTx: any) => {
      // Prisma Interactive Transaction provides a scoped client
      const txClient: DatabaseClient = {
        client: prismaTx,
        transaction: async () => { throw new Error('Nested manual transactions not supported'); },
        query: this.db.query.bind(this.db),
        execute: this.db.execute.bind(this.db),
        disconnect: async () => {}, // Cannot disconnect a transactional scoped client
      };
      
      const ctx = new TransactionContext(txClient, correlationId, requestContext);
      return await work(ctx);
    });
  }
}
