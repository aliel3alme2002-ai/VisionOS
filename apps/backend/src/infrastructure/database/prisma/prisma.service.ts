import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TypedModelDelegate } from '../repositories/common/base-prisma.repository';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
    });
  }

  async onModuleInit(): Promise<void> {
    this.logger.log('Initializing Prisma database connection...');
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log('Closing Prisma database connection...');
    await this.$disconnect();
  }

  public getDelegate<T>(modelName: string): TypedModelDelegate<T> {
    const delegateMap = this as unknown as Record<string, TypedModelDelegate<T>>;
    const delegate = delegateMap[modelName];
    if (!delegate) {
      throw new Error(`Prisma delegate for model ${modelName} not found.`);
    }
    return delegate;
  }
}
