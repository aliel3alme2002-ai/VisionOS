export interface EdgeRuntimeProvider {
  ping(edgeId: string): Promise<boolean>;
  restart(edgeId: string): Promise<boolean>;
  updateVersion(edgeId: string, version: string): Promise<boolean>;
}

export const EDGE_RUNTIME_PROVIDER = Symbol('EDGE_RUNTIME_PROVIDER');
