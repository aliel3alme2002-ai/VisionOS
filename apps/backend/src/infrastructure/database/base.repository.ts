import { DatabaseClient } from './database-client.interface';

export abstract class BaseRepository {
  constructor(protected readonly db: DatabaseClient) {}

  protected softDeleteQuery(): { deletedAt: null } {
    return { deletedAt: null };
  }

  // Any shared robust query runners or mappings would go here.
}
