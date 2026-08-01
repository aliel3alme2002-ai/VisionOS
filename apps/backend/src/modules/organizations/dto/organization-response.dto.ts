import { Organization } from '../domain/entities/organization';

export class OrganizationResponseDto {
  id!: string;
  name!: string;
  slug!: string;
  description!: string | null;
  status!: string;
  ownerId!: string;
  settings!: {
    timezone: string;
    locale: string;
    currency: string;
    dateFormat: string;
    timeFormat: string;
  };
  branding!: {
    logoUrl: string | null;
    primaryColor: string | null;
    secondaryColor: string | null;
    faviconUrl: string | null;
  };
  features!: {
    visionEnabled: boolean;
    edgeEnabled: boolean;
    recordingEnabled: boolean;
    workflowEnabled: boolean;
    notificationEnabled: boolean;
    analyticsEnabled: boolean;
  };
  limits!: {
    maxUsers: number;
    maxCameras: number;
    maxEdgeNodes: number;
    maxAiModels: number;
    maxPipelines: number;
    maxStorageGb: number;
  };
  createdAt!: string;
  updatedAt!: string;
  deletedAt!: string | null;

  public static fromEntity(org: Organization): OrganizationResponseDto {
    const dto = new OrganizationResponseDto();
    dto.id = org.id;
    dto.name = org.name.getValue();
    dto.slug = org.slug.getValue();
    dto.description = org.description;
    dto.status = org.status.getValue();
    dto.ownerId = org.ownerId;
    dto.settings = {
      timezone: org.settings.timezone,
      locale: org.settings.locale,
      currency: org.settings.currency,
      dateFormat: org.settings.dateFormat,
      timeFormat: org.settings.timeFormat,
    };
    dto.branding = {
      logoUrl: org.branding.logoUrl,
      primaryColor: org.branding.primaryColor,
      secondaryColor: org.branding.secondaryColor,
      faviconUrl: org.branding.faviconUrl,
    };
    dto.features = {
      visionEnabled: org.features.visionEnabled,
      edgeEnabled: org.features.edgeEnabled,
      recordingEnabled: org.features.recordingEnabled,
      workflowEnabled: org.features.workflowEnabled,
      notificationEnabled: org.features.notificationEnabled,
      analyticsEnabled: org.features.analyticsEnabled,
    };
    dto.limits = {
      maxUsers: org.limits.maxUsers,
      maxCameras: org.limits.maxCameras,
      maxEdgeNodes: org.limits.maxEdgeNodes,
      maxAiModels: org.limits.maxAiModels,
      maxPipelines: org.limits.maxPipelines,
      maxStorageGb: org.limits.maxStorageGb,
    };
    dto.createdAt = org.createdAt.toISOString();
    dto.updatedAt = org.updatedAt.toISOString();
    dto.deletedAt = org.deletedAt ? org.deletedAt.toISOString() : null;
    return dto;
  }
}
