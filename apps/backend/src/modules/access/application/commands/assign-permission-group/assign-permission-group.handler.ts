import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignPermissionGroupCommand } from './assign-permission-group.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IPermissionGroupRepository } from '../../../domain/repositories/permission-group.repository';
import { IRoleRepository } from '../../../domain/repositories/role.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(AssignPermissionGroupCommand)
export class AssignPermissionGroupHandler implements BaseCommandHandler<AssignPermissionGroupCommand, void>, ICommandHandler<AssignPermissionGroupCommand> {
  constructor(
    @Inject('IPermissionGroupRepository') private readonly groupRepo: IPermissionGroupRepository,
    @Inject('IRoleRepository') private readonly roleRepo: IRoleRepository,
  ) {}

  async execute(command: AssignPermissionGroupCommand): Promise<void> {
    const group = await this.groupRepo.findById(command.groupId);
    if (!group) throw new NotFoundException(`Group '${command.groupId}' not found.`);
    const role = await this.roleRepo.findById(command.roleId);
    if (!role) throw new NotFoundException(`Role '${command.roleId}' not found.`);

    for (const p of group.permissions) {
      role.addPermission(p);
    }
    await this.roleRepo.save(role);
  }
}
