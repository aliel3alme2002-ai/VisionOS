import { Organization } from '../../../../modules/organizations/domain/entities/organization';
import { OrganizationName } from '../../../../modules/organizations/domain/value-objects/organization-name';
import { OrganizationSlug } from '../../../../modules/organizations/domain/value-objects/organization-slug';
import { OrganizationStatus } from '../../../../modules/organizations/domain/value-objects/organization-status';
import { OrganizationSettings } from '../../../../modules/organizations/domain/entities/organization-settings';
import { OrganizationBranding } from '../../../../modules/organizations/domain/entities/organization-branding';
import { OrganizationFeatures } from '../../../../modules/organizations/domain/entities/organization-features';
import { OrganizationLimits } from '../../../../modules/organizations/domain/entities/organization-limits';

export interface RawOrganizationRecord {
  id: string;
  name: string;
  slug: string;
  status?: string;
  ownerId?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class OrganizationMapper {
  public static toDomain(prismaModel: RawOrganizationRecord): Organization {
    return new Organization({
      id: prismaModel.id,
      name: new OrganizationName(prismaModel.name),
      slug: new OrganizationSlug(prismaModel.slug),
      ownerId: prismaModel.ownerId ?? 'default-owner',
      status: OrganizationStatus.create(prismaModel.status ?? 'ACTIVE'),
      settings: new OrganizationSettings(),
      branding: new OrganizationBranding(),
      features: new OrganizationFeatures(),
      limits: new OrganizationLimits(),
      createdAt: prismaModel.createdAt,
      updatedAt: prismaModel.updatedAt,
      deletedAt: prismaModel.deletedAt ?? null,
    });
  }

  public static toPrisma(domain: Organization): RawOrganizationRecord {
    return {
      id: domain.id,
      name: domain.name.getValue(),
      slug: domain.slug.getValue(),
      status: domain.status.getValue(),
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
