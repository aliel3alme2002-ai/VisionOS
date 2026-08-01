import { Injectable } from '@nestjs/common';
import { RuntimeSession } from './runtime-session';

@Injectable()
export class RuntimeRegistry {
  private sessions: Map<string, RuntimeSession> = new Map();

  register(session: RuntimeSession): void {
    this.sessions.set(session.id, session);
  }

  lookup(id: string): RuntimeSession | undefined {
    return this.sessions.get(id);
  }

  remove(id: string): void {
    this.sessions.delete(id);
  }

  getAll(): RuntimeSession[] {
    return Array.from(this.sessions.values());
  }
}
