import { Module, Global } from '@nestjs/common';
import { OrganizationService } from './services/organization.service';
import { MembershipService } from './services/membership.service';
import { HierarchyService } from './services/hierarchy.service';
import { ORGANIZATION_REPOSITORY } from './repositories/organization.repository';
import { HOTEL_REPOSITORY } from './repositories/hotel.repository';
import { DEPARTMENT_REPOSITORY } from './repositories/department.repository';
import { MEMBERSHIP_REPOSITORY } from './repositories/membership.repository';
import { HIERARCHY_REPOSITORY } from './repositories/hierarchy.repository';

@Global()
@Module({
  providers: [
    OrganizationService,
    MembershipService,
    HierarchyService,
  ],
  exports: [
    OrganizationService,
    MembershipService,
    HierarchyService,
    ORGANIZATION_REPOSITORY,
    HOTEL_REPOSITORY,
    DEPARTMENT_REPOSITORY,
    MEMBERSHIP_REPOSITORY,
    HIERARCHY_REPOSITORY,
  ],
})
export class OrganizationModule {}
