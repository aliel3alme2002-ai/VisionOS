import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { OrganizationController } from './controllers/organization.controller';

import { CreateOrganizationHandler } from './application/commands/create-organization/create-organization.handler';
import { UpdateOrganizationHandler } from './application/commands/update-organization/update-organization.handler';
import { DeleteOrganizationHandler } from './application/commands/delete-organization/delete-organization.handler';
import { RestoreOrganizationHandler } from './application/commands/restore-organization/restore-organization.handler';
import { UpdateSettingsHandler } from './application/commands/update-settings/update-settings.handler';
import { UpdateBrandingHandler } from './application/commands/update-branding/update-branding.handler';
import { UpdateFeaturesHandler } from './application/commands/update-features/update-features.handler';
import { UpdateLimitsHandler } from './application/commands/update-limits/update-limits.handler';

import { GetOrganizationHandler } from './application/queries/get-organization/get-organization.handler';
import { ListOrganizationsHandler } from './application/queries/list-organizations/list-organizations.handler';
import { GetSettingsHandler } from './application/queries/get-settings/get-settings.handler';

import { OrganizationPolicyService } from './domain/services/organization-policy.service';
import { InMemoryOrganizationRepository } from './domain/repositories/in-memory-organization.repository';

const CommandHandlers = [
  CreateOrganizationHandler,
  UpdateOrganizationHandler,
  DeleteOrganizationHandler,
  RestoreOrganizationHandler,
  UpdateSettingsHandler,
  UpdateBrandingHandler,
  UpdateFeaturesHandler,
  UpdateLimitsHandler,
];

const QueryHandlers = [
  GetOrganizationHandler,
  ListOrganizationsHandler,
  GetSettingsHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [OrganizationController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    OrganizationPolicyService,
    {
      provide: 'IOrganizationRepository',
      useClass: InMemoryOrganizationRepository,
    },
  ],
  exports: [
    OrganizationPolicyService,
    'IOrganizationRepository',
  ],
})
export class OrganizationModule {}
