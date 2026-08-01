export interface SdkOptions {
  readonly apiUrl: string;
  readonly mqttUrl?: string;
  readonly timeoutMs?: number;
  readonly retries?: number;
}
