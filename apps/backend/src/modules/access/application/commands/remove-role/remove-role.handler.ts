import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveRoleCommand } from './remove-role.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRoleAssignmentRepository } from '../../../domain/repositories/role-assignment.repository';

@CommandHandler(RemoveRoleCommand)
export class RemoveRoleHandler implements BaseCommandHandler<RemoveRoleCommand, void>, ICommandHandler<RemoveRoleCommand> {
  constructor(@Inject('IRoleAssignmentRepository') private readonly repository: IRoleAssignmentRepository) {}

  async execute(command: RemoveRoleCommand): Promise<void> {
    await this.repository.delete(command.userId, command.roleId, command.organizationId);
  }
}
