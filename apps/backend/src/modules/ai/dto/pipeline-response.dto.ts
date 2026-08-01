import { Pipeline } from '../domain/entities/pipeline';

export class PipelineResponseDto {
  id!: string;
  organizationId!: string;
  name!: string;
  description!: string | null;
  runtimeId!: string;
  stagesCount!: number;

  public static fromEntity(pipe: Pipeline): PipelineResponseDto {
    const dto = new PipelineResponseDto();
    dto.id = pipe.id;
    dto.organizationId = pipe.organizationId;
    dto.name = pipe.name;
    dto.description = pipe.description;
    dto.runtimeId = pipe.runtimeId;
    dto.stagesCount = pipe.stages.length;
    return dto;
  }
}
