import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePermissionCommand } from './update-permission.command';
import { PermissionResponseDto } from '../../dto/permission-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IPermissionRepository } from '../../../domain/repositories/permission.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';
import { Permission } from '../../../domain/entities/permission';

@CommandHandler(UpdatePermissionCommand)
export class UpdatePermissionHandler implements BaseCommandHandler<UpdatePermissionCommand, PermissionResponseDto>, ICommandHandler<UpdatePermissionCommand> {
  constructor(@Inject('IPermissionRepository') private readonly repository: IPermissionRepository) {}

  async execute(command: UpdatePermissionCommand): Promise<PermissionResponseDto> {
    const perm = await this.repository.findById(command.id);
    if (!perm) throw new NotFoundException(`Permission '${command.id}' not found.`);
    const updated = new Permission({
      id: perm.id,
      resource: perm.resource,
      action: perm.action,
      scope: perm.scope,
      description: command.description ?? perm.description,
    });
    await this.repository.save(updated);
    return PermissionResponseDto.fromEntity(updated);
  }
}
