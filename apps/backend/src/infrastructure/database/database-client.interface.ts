import { PrismaClient } from '@prisma/client';

export interface DatabaseClient {
  transaction<T>(fn: (tx: DatabaseClient) => Promise<T>): Promise<T>;
  query<T>(query: string, ...values: unknown[]): Promise<T>;
  execute(query: string, ...values: unknown[]): Promise<void>;
  disconnect(): Promise<void>;
  readonly client: PrismaClient; 
}
