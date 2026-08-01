export interface EdgeCapabilities {
  edgeId: string;
  cuda: boolean;
  tensorRT: boolean;
  openVINO: boolean;
  cpuOnly: boolean;
  multiStream: boolean;
  recording: boolean;
}
