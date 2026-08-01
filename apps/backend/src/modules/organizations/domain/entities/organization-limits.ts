export interface OrganizationLimitsProps {
  maxUsers?: number;
  maxCameras?: number;
  maxEdgeNodes?: number;
  maxAiModels?: number;
  maxPipelines?: number;
  maxStorageGb?: number;
}

export class OrganizationLimits {
  public readonly maxUsers: number;
  public readonly maxCameras: number;
  public readonly maxEdgeNodes: number;
  public readonly maxAiModels: number;
  public readonly maxPipelines: number;
  public readonly maxStorageGb: number;

  constructor(props?: OrganizationLimitsProps) {
    this.maxUsers = props?.maxUsers ?? 10;
    this.maxCameras = props?.maxCameras ?? 5;
    this.maxEdgeNodes = props?.maxEdgeNodes ?? 2;
    this.maxAiModels = props?.maxAiModels ?? 3;
    this.maxPipelines = props?.maxPipelines ?? 5;
    this.maxStorageGb = props?.maxStorageGb ?? 100;
  }

  public update(props: Partial<OrganizationLimitsProps>): OrganizationLimits {
    return new OrganizationLimits({
      maxUsers: props.maxUsers ?? this.maxUsers,
      maxCameras: props.maxCameras ?? this.maxCameras,
      maxEdgeNodes: props.maxEdgeNodes ?? this.maxEdgeNodes,
      maxAiModels: props.maxAiModels ?? this.maxAiModels,
      maxPipelines: props.maxPipelines ?? this.maxPipelines,
      maxStorageGb: props.maxStorageGb ?? this.maxStorageGb,
    });
  }
}
