import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateSettingsCommand } from './update-settings.command';
import { OrganizationResponseDto } from '../../../dto/organization-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@CommandHandler(UpdateSettingsCommand)
export class UpdateSettingsHandler
  implements BaseCommandHandler<UpdateSettingsCommand, OrganizationResponseDto>, ICommandHandler<UpdateSettingsCommand>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(command: UpdateSettingsCommand): Promise<OrganizationResponseDto> {
    const org = await this.repository.findById(command.id);
    if (!org) {
      throw new NotFoundException(`Organization with ID '${command.id}' not found.`);
    }

    org.updateSettings(command.settings);
    await this.repository.save(org);
    return OrganizationResponseDto.fromEntity(org);
  }
}
