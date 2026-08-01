import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateOrganizationCommand } from './create-organization.command';
import { OrganizationResponseDto } from '../../../dto/organization-response.dto';
import { BaseCommandHandler } from '../../../../application/common/base/base-command-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { OrganizationPolicyService } from '../../../domain/services/organization-policy.service';
import { Organization } from '../../../domain/entities/organization';
import { OrganizationSlug } from '../../../domain/value-objects/organization-slug';
import { randomUUID } from 'crypto';

@CommandHandler(CreateOrganizationCommand)
export class CreateOrganizationHandler
  implements BaseCommandHandler<CreateOrganizationCommand, OrganizationResponseDto>, ICommandHandler<CreateOrganizationCommand>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
    private readonly policyService: OrganizationPolicyService,
  ) {}

  async execute(command: CreateOrganizationCommand): Promise<OrganizationResponseDto> {
    const slugValue = command.slug
      ? command.slug
      : OrganizationSlug.createFrom(command.name).getValue();

    await this.policyService.validateUniqueSlug(slugValue);

    const id = randomUUID();
    const org = Organization.create(id, command.name, command.ownerId, slugValue, command.description);

    await this.repository.save(org);
    return OrganizationResponseDto.fromEntity(org);
  }
}
