import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePermissionCommand } from './create-permission.command';
import { PermissionResponseDto } from '../../dto/permission-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IPermissionRepository } from '../../../domain/repositories/permission.repository';
import { Permission, PermissionProps } from '../../../domain/entities/permission';
import { PermissionScope } from '../../../domain/entities/permission-scope';
import { randomUUID } from 'crypto';

@CommandHandler(CreatePermissionCommand)
export class CreatePermissionHandler implements BaseCommandHandler<CreatePermissionCommand, PermissionResponseDto>, ICommandHandler<CreatePermissionCommand> {
  constructor(@Inject('IPermissionRepository') private readonly repository: IPermissionRepository) {}

  async execute(command: CreatePermissionCommand): Promise<PermissionResponseDto> {
    const id = randomUUID();
    const scope = command.scope ? new PermissionScope(command.scope) : PermissionScope.organization();
    const props: PermissionProps = {
      id,
      resource: command.resource,
      action: command.action,
      scope,
    };
    if (command.description !== undefined) {
      props.description = command.description;
    }
    const permission = new Permission(props);
    await this.repository.save(permission);
    return PermissionResponseDto.fromEntity(permission);
  }
}
