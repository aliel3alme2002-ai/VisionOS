export interface OnvifClient {
  id: string;
  ipAddress: string;
  callSoap(service: string, action: string, body: unknown): Promise<unknown>;
}
