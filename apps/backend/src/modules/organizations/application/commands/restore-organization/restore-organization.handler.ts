import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RestoreOrganizationCommand } from './restore-organization.command';
import { OrganizationResponseDto } from '../../../dto/organization-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(RestoreOrganizationCommand)
export class RestoreOrganizationHandler
  implements BaseCommandHandler<RestoreOrganizationCommand, OrganizationResponseDto>, ICommandHandler<RestoreOrganizationCommand>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(command: RestoreOrganizationCommand): Promise<OrganizationResponseDto> {
    const org = await this.repository.findById(command.id, true);
    if (!org) {
      throw new NotFoundException(`Organization with ID '${command.id}' not found.`);
    }

    org.restore();
    await this.repository.save(org);
    return OrganizationResponseDto.fromEntity(org);
  }
}
