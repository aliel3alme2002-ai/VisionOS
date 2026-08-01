export enum DeploymentStatusEnum {
  PENDING = 'PENDING',
  DEPLOYING = 'DEPLOYING',
  ACTIVE = 'ACTIVE',
  FAILED = 'FAILED',
  ROLLED_BACK = 'ROLLED_BACK',
}

export class DeploymentStatus {
  constructor(private readonly value: DeploymentStatusEnum) {}

  public getValue(): DeploymentStatusEnum { return this.value; }
  public isActive(): boolean { return this.value === DeploymentStatusEnum.ACTIVE; }

  public static pending(): DeploymentStatus { return new DeploymentStatus(DeploymentStatusEnum.PENDING); }
  public static deploying(): DeploymentStatus { return new DeploymentStatus(DeploymentStatusEnum.DEPLOYING); }
  public static active(): DeploymentStatus { return new DeploymentStatus(DeploymentStatusEnum.ACTIVE); }
  public static failed(): DeploymentStatus { return new DeploymentStatus(DeploymentStatusEnum.FAILED); }
  public static rolledBack(): DeploymentStatus { return new DeploymentStatus(DeploymentStatusEnum.ROLLED_BACK); }

  public static create(statusStr: string): DeploymentStatus {
    const uppercase = statusStr.toUpperCase() as DeploymentStatusEnum;
    if (!Object.values(DeploymentStatusEnum).includes(uppercase)) {
      throw new Error(`Invalid deployment status: ${statusStr}`);
    }
    return new DeploymentStatus(uppercase);
  }
}
