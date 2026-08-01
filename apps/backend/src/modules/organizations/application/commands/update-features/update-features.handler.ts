import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateFeaturesCommand } from './update-features.command';
import { OrganizationResponseDto } from '../../../dto/organization-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateFeaturesCommand)
export class UpdateFeaturesHandler
  implements BaseCommandHandler<UpdateFeaturesCommand, OrganizationResponseDto>, ICommandHandler<UpdateFeaturesCommand>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(command: UpdateFeaturesCommand): Promise<OrganizationResponseDto> {
    const org = await this.repository.findById(command.id);
    if (!org) {
      throw new NotFoundException(`Organization with ID '${command.id}' not found.`);
    }

    org.updateFeatures(command.features);
    await this.repository.save(org);
    return OrganizationResponseDto.fromEntity(org);
  }
}
