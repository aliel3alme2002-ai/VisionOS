import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateRoleCommand } from './create-role.command';
import { RoleResponseDto } from '../../dto/role-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRoleRepository } from '../../../domain/repositories/role.repository';
import { IPermissionRepository } from '../../../domain/repositories/permission.repository';
import { AccessPolicyService } from '../../../domain/services/access-policy.service';
import { Role, RoleProps } from '../../../domain/entities/role';
import { randomUUID } from 'crypto';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements BaseCommandHandler<CreateRoleCommand, RoleResponseDto>, ICommandHandler<CreateRoleCommand> {
  constructor(
    @Inject('IRoleRepository') private readonly repository: IRoleRepository,
    @Inject('IPermissionRepository') private readonly permRepo: IPermissionRepository,
    private readonly policyService: AccessPolicyService,
  ) {}

  async execute(command: CreateRoleCommand): Promise<RoleResponseDto> {
    await this.policyService.validateUniqueRoleName(command.name, command.organizationId);
    const id = randomUUID();
    const props: RoleProps = {
      id,
      name: command.name,
    };
    if (command.organizationId !== undefined) props.organizationId = command.organizationId;
    if (command.description !== undefined) props.description = command.description;
    if (command.parentRoleId !== undefined) props.parentRoleId = command.parentRoleId;

    const role = new Role(props);

    if (command.permissionIds && command.permissionIds.length > 0) {
      for (const pId of command.permissionIds) {
        const p = await this.permRepo.findById(pId);
        if (p) role.addPermission(p);
      }
    }

    await this.repository.save(role);
    return RoleResponseDto.fromEntity(role);
  }
}
