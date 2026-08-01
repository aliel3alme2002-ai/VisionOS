export interface OrganizationFeaturesProps {
  visionEnabled?: boolean;
  edgeEnabled?: boolean;
  recordingEnabled?: boolean;
  workflowEnabled?: boolean;
  notificationEnabled?: boolean;
  analyticsEnabled?: boolean;
}

export class OrganizationFeatures {
  public readonly visionEnabled: boolean;
  public readonly edgeEnabled: boolean;
  public readonly recordingEnabled: boolean;
  public readonly workflowEnabled: boolean;
  public readonly notificationEnabled: boolean;
  public readonly analyticsEnabled: boolean;

  constructor(props?: OrganizationFeaturesProps) {
    this.visionEnabled = props?.visionEnabled ?? true;
    this.edgeEnabled = props?.edgeEnabled ?? false;
    this.recordingEnabled = props?.recordingEnabled ?? true;
    this.workflowEnabled = props?.workflowEnabled ?? true;
    this.notificationEnabled = props?.notificationEnabled ?? true;
    this.analyticsEnabled = props?.analyticsEnabled ?? true;
  }

  public update(props: Partial<OrganizationFeaturesProps>): OrganizationFeatures {
    return new OrganizationFeatures({
      visionEnabled: props.visionEnabled ?? this.visionEnabled,
      edgeEnabled: props.edgeEnabled ?? this.edgeEnabled,
      recordingEnabled: props.recordingEnabled ?? this.recordingEnabled,
      workflowEnabled: props.workflowEnabled ?? this.workflowEnabled,
      notificationEnabled: props.notificationEnabled ?? this.notificationEnabled,
      analyticsEnabled: props.analyticsEnabled ?? this.analyticsEnabled,
    });
  }
}
