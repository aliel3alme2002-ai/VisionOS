import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateOrganizationCommand } from './update-organization.command';
import { OrganizationResponseDto } from '../../../dto/organization-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateOrganizationCommand)
export class UpdateOrganizationHandler
  implements BaseCommandHandler<UpdateOrganizationCommand, OrganizationResponseDto>, ICommandHandler<UpdateOrganizationCommand>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(command: UpdateOrganizationCommand): Promise<OrganizationResponseDto> {
    const org = await this.repository.findById(command.id);
    if (!org) {
      throw new NotFoundException(`Organization with ID '${command.id}' not found.`);
    }

    org.update(command.name, command.description);
    await this.repository.save(org);
    return OrganizationResponseDto.fromEntity(org);
  }
}
