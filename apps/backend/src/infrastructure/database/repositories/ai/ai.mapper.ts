import { AiModel } from '../../../../modules/ai/domain/entities/ai-model';
import { Deployment } from '../../../../modules/ai/domain/entities/deployment';
import { Pipeline } from '../../../../modules/ai/domain/entities/pipeline';
import { Runtime } from '../../../../modules/ai/domain/entities/runtime';
import { ModelStatus } from '../../../../modules/ai/domain/value-objects/model-status';
import { DeploymentStatus } from '../../../../modules/ai/domain/value-objects/deployment-status';
import { RuntimeStatus } from '../../../../modules/ai/domain/value-objects/runtime-status';

export interface RawAiModelRecord {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
  framework: string;
  task: string;
  inputShape: string;
  outputShape: string;
  defaultVersion?: string | null;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface RawDeploymentRecord {
  id: string;
  modelVersionId: string;
  runtimeId: string;
  deploymentSlotId: string;
  strategy?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RawPipelineRecord {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
  runtimeId: string;
}

export interface RawAiRuntimeRecord {
  id: string;
  edgeNodeId: string;
  type: string;
  version: string;
  status?: string;
}

export class AiMapper {
  public static modelToDomain(raw: RawAiModelRecord): AiModel {
    return new AiModel({
      id: raw.id,
      organizationId: raw.organizationId,
      name: raw.name,
      description: raw.description ?? null,
      framework: raw.framework,
      task: raw.task,
      inputShape: raw.inputShape,
      outputShape: raw.outputShape,
      defaultVersion: raw.defaultVersion ?? null,
      status: ModelStatus.create(raw.status ?? 'READY'),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt ?? null,
    });
  }

  public static modelToPrisma(domain: AiModel): RawAiModelRecord {
    return {
      id: domain.id,
      organizationId: domain.organizationId,
      name: domain.name,
      description: domain.description,
      framework: domain.framework,
      task: domain.task,
      inputShape: domain.inputShape,
      outputShape: domain.outputShape,
      defaultVersion: domain.defaultVersion,
      status: domain.status.getValue(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public static deploymentToDomain(raw: RawDeploymentRecord): Deployment {
    return new Deployment({
      id: raw.id,
      modelVersionId: raw.modelVersionId,
      runtimeId: raw.runtimeId,
      deploymentSlotId: raw.deploymentSlotId,
      strategy: raw.strategy ?? 'Rolling',
      status: DeploymentStatus.create(raw.status ?? 'ACTIVE'),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  public static deploymentToPrisma(domain: Deployment): RawDeploymentRecord {
    return {
      id: domain.id,
      modelVersionId: domain.modelVersionId,
      runtimeId: domain.runtimeId,
      deploymentSlotId: domain.deploymentSlotId,
      strategy: domain.strategy,
      status: domain.status.getValue(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public static pipelineToDomain(raw: RawPipelineRecord): Pipeline {
    return new Pipeline({
      id: raw.id,
      organizationId: raw.organizationId,
      name: raw.name,
      description: raw.description ?? null,
      runtimeId: raw.runtimeId,
    });
  }

  public static runtimeToDomain(raw: RawAiRuntimeRecord): Runtime {
    return new Runtime({
      id: raw.id,
      edgeNodeId: raw.edgeNodeId,
      type: raw.type,
      version: raw.version,
      status: RuntimeStatus.create(raw.status ?? 'ONLINE'),
    });
  }

  public static runtimeToPrisma(domain: Runtime): RawAiRuntimeRecord {
    return {
      id: domain.id,
      edgeNodeId: domain.edgeNodeId,
      type: domain.type,
      version: domain.version,
      status: domain.status.getValue(),
    };
  }
}
