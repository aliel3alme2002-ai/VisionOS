import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateLimitsCommand } from './update-limits.command';
import { OrganizationResponseDto } from '../../../dto/organization-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateLimitsCommand)
export class UpdateLimitsHandler
  implements BaseCommandHandler<UpdateLimitsCommand, OrganizationResponseDto>, ICommandHandler<UpdateLimitsCommand>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(command: UpdateLimitsCommand): Promise<OrganizationResponseDto> {
    const org = await this.repository.findById(command.id);
    if (!org) {
      throw new NotFoundException(`Organization with ID '${command.id}' not found.`);
    }

    org.updateLimits(command.limits);
    await this.repository.save(org);
    return OrganizationResponseDto.fromEntity(org);
  }
}
