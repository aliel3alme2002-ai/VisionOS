import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateDetectionCommand } from './create-detection.command';
import { DetectionResponseDto } from '../../../dto/detection-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IDetectionRepository } from '../../../domain/repositories/detection.repository';
import { TrackingEngineService } from '../../../domain/services/tracking-engine.service';
import { Detection, DetectionProps } from '../../../domain/entities/detection';
import { BoundingBox } from '../../../domain/value-objects/bounding-box';
import { randomUUID } from 'crypto';

@CommandHandler(CreateDetectionCommand)
export class CreateDetectionHandler implements BaseCommandHandler<CreateDetectionCommand, DetectionResponseDto>, ICommandHandler<CreateDetectionCommand> {
  constructor(
    @Inject('IDetectionRepository') private readonly repository: IDetectionRepository,
    private readonly trackingEngine: TrackingEngineService,
  ) {}

  async execute(command: CreateDetectionCommand): Promise<DetectionResponseDto> {
    const dto = command.dto;
    const props: DetectionProps = {
      id: randomUUID(),
      cameraId: dto.cameraId,
      pipelineId: dto.pipelineId,
      runtimeId: dto.runtimeId,
      frameId: dto.frameId,
    };
    const detection = new Detection(props);

    if (dto.objects) {
      for (const objInput of dto.objects) {
        const bbox = new BoundingBox({ x: objInput.x, y: objInput.y, width: objInput.width, height: objInput.height });
        const trackedObj = await this.trackingEngine.processDetection(objInput.className, objInput.confidence, bbox);
        detection.addObject(trackedObj);
      }
    }

    await this.repository.save(detection);
    return DetectionResponseDto.fromEntity(detection);
  }
}
