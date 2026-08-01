import { AiModel } from '../domain/entities/ai-model';

export class ModelResponseDto {
  id!: string;
  organizationId!: string;
  name!: string;
  description!: string | null;
  framework!: string;
  task!: string;
  inputShape!: string;
  outputShape!: string;
  defaultVersion!: string | null;
  status!: string;
  versionsCount!: number;
  createdAt!: string;
  updatedAt!: string;

  public static fromEntity(model: AiModel): ModelResponseDto {
    const dto = new ModelResponseDto();
    dto.id = model.id;
    dto.organizationId = model.organizationId;
    dto.name = model.name;
    dto.description = model.description;
    dto.framework = model.framework;
    dto.task = model.task;
    dto.inputShape = model.inputShape;
    dto.outputShape = model.outputShape;
    dto.defaultVersion = model.defaultVersion;
    dto.status = model.status.getValue();
    dto.versionsCount = model.versions.length;
    dto.createdAt = model.createdAt.toISOString();
    dto.updatedAt = model.updatedAt.toISOString();
    return dto;
  }
}
