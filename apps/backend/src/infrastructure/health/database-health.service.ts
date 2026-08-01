import { Injectable, Inject } from '@nestjs/common';
import { DATABASE_CLIENT } from '../database/prisma.module';
import { DatabaseClient } from '../database/database-client.interface';

@Injectable()
export class DatabaseHealthService {
  constructor(
    @Inject(DATABASE_CLIENT) private readonly db: DatabaseClient,
  ) {}

  public async isHealthy(): Promise<boolean> {
    try {
      await this.ping();
      return true;
    } catch (e) {
      return false;
    }
  }

  public async ping(): Promise<void> {
    await this.db.query('SELECT 1');
  }
}
