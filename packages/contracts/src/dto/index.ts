import {
  TenantStatus, UserRole, EdgeStatus, CameraStatus, AlertStatus,
  AlertSeverity, NotificationChannel, NotificationStatus, LicenseStatus, DeviceType
} from '../enums';
import { UUID, ISODateString, JsonValue } from '../types';

export interface BaseDto {
  readonly id: UUID;
  readonly createdAt: ISODateString;
  readonly updatedAt: ISODateString;
  readonly deletedAt?: ISODateString;
  readonly createdBy: UUID;
  readonly updatedBy: UUID;
  readonly deletedBy?: UUID;
}

export interface TenantDto extends BaseDto {
  readonly name: string;
  readonly status: TenantStatus;
}

export interface UserDto extends BaseDto {
  readonly tenantId: UUID;
  readonly email: string;
  readonly role: UserRole;
}

export interface SiteDto extends BaseDto {
  readonly tenantId: UUID;
  readonly name: string;
  readonly timezone: string;
}

export interface BuildingDto extends BaseDto {
  readonly tenantId: UUID;
  readonly siteId: UUID;
  readonly name: string;
}

export interface FloorDto extends BaseDto {
  readonly tenantId: UUID;
  readonly buildingId: UUID;
  readonly name: string;
  readonly level: number;
}

export interface ZoneDto extends BaseDto {
  readonly tenantId: UUID;
  readonly siteId?: UUID;
  readonly floorId?: UUID;
  readonly name: string;
}

export interface EdgeBoxDto extends BaseDto {
  readonly tenantId: UUID;
  readonly siteId: UUID;
  readonly macAddress: string;
  readonly status: EdgeStatus;
}

export interface CameraDto extends BaseDto {
  readonly tenantId: UUID;
  readonly zoneId: UUID;
  readonly edgeBoxId: UUID;
  readonly streamUrl: string;
  readonly status: CameraStatus;
}

export interface DeviceDto extends BaseDto {
  readonly tenantId: UUID;
  readonly zoneId: UUID;
  readonly type: DeviceType;
}

export interface EventDto extends BaseDto {
  readonly tenantId: UUID;
  readonly sourceId: UUID;
  readonly type: string;
  readonly payload: Record<string, JsonValue>;
  readonly timestamp: ISODateString;
}

export interface RuleDto extends BaseDto {
  readonly tenantId: UUID;
  readonly name: string;
  readonly conditions: Record<string, JsonValue>;
  readonly actions: Record<string, JsonValue>;
  readonly status: boolean;
}

export interface AlertDto extends BaseDto {
  readonly tenantId: UUID;
  readonly ruleId: UUID;
  readonly eventId: UUID;
  readonly status: AlertStatus;
  readonly severity: AlertSeverity;
}

export interface NotificationDto extends BaseDto {
  readonly tenantId: UUID;
  readonly userId: UUID;
  readonly alertId: UUID;
  readonly channel: NotificationChannel;
  readonly status: NotificationStatus;
}

export interface LicenseDto extends BaseDto {
  readonly tenantId: UUID;
  readonly tier: string;
  readonly validUntil: ISODateString;
  readonly status: LicenseStatus;
}
