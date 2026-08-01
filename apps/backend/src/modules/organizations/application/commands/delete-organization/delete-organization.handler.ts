import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteOrganizationCommand } from './delete-organization.command';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(DeleteOrganizationCommand)
export class DeleteOrganizationHandler
  implements BaseCommandHandler<DeleteOrganizationCommand, void>, ICommandHandler<DeleteOrganizationCommand>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(command: DeleteOrganizationCommand): Promise<void> {
    const org = await this.repository.findById(command.id);
    if (!org) {
      throw new NotFoundException(`Organization with ID '${command.id}' not found.`);
    }

    org.delete();
    await this.repository.save(org);
  }
}
