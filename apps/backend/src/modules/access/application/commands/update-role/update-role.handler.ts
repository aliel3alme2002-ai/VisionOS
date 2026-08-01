import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateRoleCommand } from './update-role.command';
import { RoleResponseDto } from '../../dto/role-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRoleRepository } from '../../../domain/repositories/role.repository';
import { IPermissionRepository } from '../../../domain/repositories/permission.repository';
import { AccessPolicyService } from '../../../domain/services/access-policy.service';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateRoleCommand)
export class UpdateRoleHandler implements BaseCommandHandler<UpdateRoleCommand, RoleResponseDto>, ICommandHandler<UpdateRoleCommand> {
  constructor(
    @Inject('IRoleRepository') private readonly repository: IRoleRepository,
    @Inject('IPermissionRepository') private readonly permRepo: IPermissionRepository,
    private readonly policyService: AccessPolicyService,
  ) {}

  async execute(command: UpdateRoleCommand): Promise<RoleResponseDto> {
    const role = await this.repository.findById(command.id);
    if (!role) throw new NotFoundException(`Role '${command.id}' not found.`);
    this.policyService.validateSystemRoleMutation(role);

    role.update(command.name, command.description);

    if (command.permissionIds) {
      for (const pId of command.permissionIds) {
        const p = await this.permRepo.findById(pId);
        if (p) role.addPermission(p);
      }
    }

    await this.repository.save(role);
    return RoleResponseDto.fromEntity(role);
  }
}
