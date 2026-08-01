export interface NotificationPreference {
  userId: string;
  organizationId: string;
  enabledChannels: string[];
  doNotDisturb: boolean;
}
