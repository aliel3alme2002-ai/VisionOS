import { Injectable } from '@nestjs/common';
import { TransactionManager } from './transaction-manager';
import { Prisma } from '@prisma/client';

@Injectable()
export class UnitOfWork {
  constructor(private readonly transactionManager: TransactionManager) {}

  public async execute<T>(work: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
    return this.transactionManager.runInTransaction(work);
  }
}
