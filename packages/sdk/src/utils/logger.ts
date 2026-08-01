import { JsonValue } from '@visionos/contracts';

export interface LogEntry {
  readonly level: 'debug' | 'info' | 'warn' | 'error';
  readonly message: string;
  readonly context?: Record<string, JsonValue>;
  readonly timestamp: string;
}

export interface ILogger {
  debug(message: string, context?: Record<string, JsonValue>): void;
  info(message: string, context?: Record<string, JsonValue>): void;
  warn(message: string, context?: Record<string, JsonValue>): void;
  error(message: string, context?: Record<string, JsonValue>): void;
}
