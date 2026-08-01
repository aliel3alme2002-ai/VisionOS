export const AUTH_EVENT_BUS = Symbol('AUTH_EVENT_BUS');

export interface AuthEventBus {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  publish(event: any): Promise<void>;
}
