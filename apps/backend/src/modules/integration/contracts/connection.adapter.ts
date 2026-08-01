export interface ConnectionAdapter {
  connect(target: string): Promise<boolean>;
  disconnect(target: string): Promise<void>;
  reconnect(target: string): Promise<boolean>;
}
