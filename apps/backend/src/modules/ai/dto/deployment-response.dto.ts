import { Deployment } from '../domain/entities/deployment';

export class DeploymentResponseDto {
  id!: string;
  modelVersionId!: string;
  runtimeId!: string;
  deploymentSlotId!: string;
  strategy!: string;
  status!: string;
  createdAt!: string;

  public static fromEntity(dep: Deployment): DeploymentResponseDto {
    const dto = new DeploymentResponseDto();
    dto.id = dep.id;
    dto.modelVersionId = dep.modelVersionId;
    dto.runtimeId = dep.runtimeId;
    dto.deploymentSlotId = dep.deploymentSlotId;
    dto.strategy = dep.strategy;
    dto.status = dep.status.getValue();
    dto.createdAt = dep.createdAt.toISOString();
    return dto;
  }
}
