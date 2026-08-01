import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DatabaseClient } from './database-client.interface';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy, DatabaseClient {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    this.logger.log('Connecting to database...');
    await this.$connect();
    this.logger.log('Database connected successfully');
  }

  async onModuleDestroy() {
    this.logger.log('Closing database connection...');
    await this.$disconnect();
  }

  public get client(): PrismaClient {
    return this;
  }

  public async transaction<T>(fn: (tx: DatabaseClient) => Promise<T>): Promise<T> {
    return this.$transaction(async (prismaTx) => {
      const wrappedTx: DatabaseClient = {
        client: prismaTx as PrismaClient,
        transaction: async (innerFn) => innerFn(wrappedTx),
        query: async <U>(query: string, ...values: unknown[]) => prismaTx.$queryRawUnsafe(query, ...values) as unknown as U,
        execute: async (query: string, ...values: unknown[]) => { await prismaTx.$executeRawUnsafe(query, ...values); },
        disconnect: async () => {},
      };
      return fn(wrappedTx);
    });
  }

  public async query<T>(query: string, ...values: unknown[]): Promise<T> {
    return this.$queryRawUnsafe(query, ...values) as unknown as T;
  }

  public async execute(query: string, ...values: unknown[]): Promise<void> {
    await this.$executeRawUnsafe(query, ...values);
  }

  public async disconnect(): Promise<void> {
    await this.$disconnect();
  }
}
