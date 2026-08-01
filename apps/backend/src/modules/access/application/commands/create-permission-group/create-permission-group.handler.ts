import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePermissionGroupCommand } from './create-permission-group.command';
import { PermissionGroupResponseDto } from '../../dto/permission-group-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IPermissionGroupRepository } from '../../../domain/repositories/permission-group.repository';
import { IPermissionRepository } from '../../../domain/repositories/permission.repository';
import { PermissionGroup, PermissionGroupProps } from '../../../domain/entities/permission-group';
import { randomUUID } from 'crypto';

@CommandHandler(CreatePermissionGroupCommand)
export class CreatePermissionGroupHandler implements BaseCommandHandler<CreatePermissionGroupCommand, PermissionGroupResponseDto>, ICommandHandler<CreatePermissionGroupCommand> {
  constructor(
    @Inject('IPermissionGroupRepository') private readonly repository: IPermissionGroupRepository,
    @Inject('IPermissionRepository') private readonly permRepo: IPermissionRepository,
  ) {}

  async execute(command: CreatePermissionGroupCommand): Promise<PermissionGroupResponseDto> {
    const id = randomUUID();
    const props: PermissionGroupProps = { id, name: command.name };
    if (command.description !== undefined) {
      props.description = command.description;
    }
    const group = new PermissionGroup(props);
    if (command.permissionIds) {
      for (const pId of command.permissionIds) {
        const p = await this.permRepo.findById(pId);
        if (p) group.addPermission(p);
      }
    }
    await this.repository.save(group);
    return PermissionGroupResponseDto.fromEntity(group);
  }
}
