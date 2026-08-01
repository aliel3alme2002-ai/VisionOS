import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignRoleCommand } from './assign-role.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRoleAssignmentRepository } from '../../../domain/repositories/role-assignment.repository';
import { RoleAssignment, RoleAssignmentProps } from '../../../domain/entities/role-assignment';
import { randomUUID } from 'crypto';

@CommandHandler(AssignRoleCommand)
export class AssignRoleHandler implements BaseCommandHandler<AssignRoleCommand, void>, ICommandHandler<AssignRoleCommand> {
  constructor(@Inject('IRoleAssignmentRepository') private readonly repository: IRoleAssignmentRepository) {}

  async execute(command: AssignRoleCommand): Promise<void> {
    const props: RoleAssignmentProps = {
      id: randomUUID(),
      userId: command.userId,
      roleId: command.roleId,
      organizationId: command.organizationId,
      assignedBy: command.assignedBy,
    };
    if (command.expiresAt !== undefined) {
      props.expiresAt = command.expiresAt;
    }
    const assignment = new RoleAssignment(props);
    await this.repository.save(assignment);
  }
}
