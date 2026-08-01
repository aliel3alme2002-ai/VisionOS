import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterRuntimeCommand } from './register-runtime.command';
import { RuntimeResponseDto } from '../../../dto/runtime-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRuntimeRepository } from '../../../domain/repositories/runtime.repository';
import { Runtime, RuntimeProps } from '../../../domain/entities/runtime';
import { randomUUID } from 'crypto';

@CommandHandler(RegisterRuntimeCommand)
export class RegisterRuntimeHandler implements BaseCommandHandler<RegisterRuntimeCommand, RuntimeResponseDto>, ICommandHandler<RegisterRuntimeCommand> {
  constructor(@Inject('IRuntimeRepository') private readonly repository: IRuntimeRepository) {}

  async execute(command: RegisterRuntimeCommand): Promise<RuntimeResponseDto> {
    const dto = command.dto;
    const props: RuntimeProps = {
      id: randomUUID(),
      edgeNodeId: dto.edgeNodeId,
      type: dto.type,
      version: dto.version,
    };
    const runtime = new Runtime(props);
    await this.repository.save(runtime);
    return RuntimeResponseDto.fromEntity(runtime);
  }
}
