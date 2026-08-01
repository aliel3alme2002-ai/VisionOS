import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteRoleCommand } from './delete-role.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IRoleRepository } from '../../../domain/repositories/role.repository';
import { AccessPolicyService } from '../../../domain/services/access-policy.service';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(DeleteRoleCommand)
export class DeleteRoleHandler implements BaseCommandHandler<DeleteRoleCommand, void>, ICommandHandler<DeleteRoleCommand> {
  constructor(
    @Inject('IRoleRepository') private readonly repository: IRoleRepository,
    private readonly policyService: AccessPolicyService,
  ) {}

  async execute(command: DeleteRoleCommand): Promise<void> {
    const role = await this.repository.findById(command.id);
    if (!role) throw new NotFoundException(`Role '${command.id}' not found.`);
    this.policyService.validateSystemRoleMutation(role);

    role.delete();
    await this.repository.save(role);
  }
}
