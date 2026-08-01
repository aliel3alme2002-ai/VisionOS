export interface OrganizationSettingsProps {
  timezone?: string;
  locale?: string;
  currency?: string;
  dateFormat?: string;
  timeFormat?: string;
}

export class OrganizationSettings {
  public readonly timezone: string;
  public readonly locale: string;
  public readonly currency: string;
  public readonly dateFormat: string;
  public readonly timeFormat: string;

  constructor(props?: OrganizationSettingsProps) {
    this.timezone = props?.timezone ?? 'UTC';
    this.locale = props?.locale ?? 'en-US';
    this.currency = props?.currency ?? 'USD';
    this.dateFormat = props?.dateFormat ?? 'YYYY-MM-DD';
    this.timeFormat = props?.timeFormat ?? 'HH:mm:ss';
  }

  public update(props: Partial<OrganizationSettingsProps>): OrganizationSettings {
    return new OrganizationSettings({
      timezone: props.timezone ?? this.timezone,
      locale: props.locale ?? this.locale,
      currency: props.currency ?? this.currency,
      dateFormat: props.dateFormat ?? this.dateFormat,
      timeFormat: props.timeFormat ?? this.timeFormat,
    });
  }
}
