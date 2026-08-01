export interface StorageHealth {
  available: boolean;
  latencyMs: number;
  totalSpaceBytes: number;
  freeSpaceBytes: number;
}
