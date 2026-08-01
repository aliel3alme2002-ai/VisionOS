import { OrganizationName } from '../value-objects/organization-name';
import { OrganizationSlug } from '../value-objects/organization-slug';
import { OrganizationStatus } from '../value-objects/organization-status';
import { OrganizationSettings } from './organization-settings';
import { OrganizationBranding } from './organization-branding';
import { OrganizationFeatures } from './organization-features';
import { OrganizationLimits } from './organization-limits';
import { OrganizationCreatedEvent } from '../events/organization-created.event';
import { OrganizationUpdatedEvent } from '../events/organization-updated.event';
import { OrganizationDeletedEvent } from '../events/organization-deleted.event';
import { OrganizationRestoredEvent } from '../events/organization-restored.event';

export interface OrganizationProps {
  id: string;
  name: OrganizationName;
  slug: OrganizationSlug;
  description?: string | null;
  status?: OrganizationStatus;
  ownerId: string;
  settings?: OrganizationSettings;
  branding?: OrganizationBranding;
  features?: OrganizationFeatures;
  limits?: OrganizationLimits;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export class Organization {
  public readonly id: string;
  private _name: OrganizationName;
  private _slug: OrganizationSlug;
  private _description: string | null;
  private _status: OrganizationStatus;
  public readonly ownerId: string;
  private _settings: OrganizationSettings;
  private _branding: OrganizationBranding;
  private _features: OrganizationFeatures;
  private _limits: OrganizationLimits;
  public readonly createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;
  private _domainEvents: any[] = [];

  constructor(props: OrganizationProps) {
    this.id = props.id;
    this._name = props.name;
    this._slug = props.slug;
    this._description = props.description ?? null;
    this._status = props.status ?? OrganizationStatus.active();
    this.ownerId = props.ownerId;
    this._settings = props.settings ?? new OrganizationSettings();
    this._branding = props.branding ?? new OrganizationBranding();
    this._features = props.features ?? new OrganizationFeatures();
    this._limits = props.limits ?? new OrganizationLimits();
    this.createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._deletedAt = props.deletedAt ?? null;
  }

  public get name(): OrganizationName { return this._name; }
  public get slug(): OrganizationSlug { return this._slug; }
  public get description(): string | null { return this._description; }
  public get status(): OrganizationStatus { return this._status; }
  public get settings(): OrganizationSettings { return this._settings; }
  public get branding(): OrganizationBranding { return this._branding; }
  public get features(): OrganizationFeatures { return this._features; }
  public get limits(): OrganizationLimits { return this._limits; }
  public get updatedAt(): Date { return this._updatedAt; }
  public get deletedAt(): Date | null { return this._deletedAt; }
  public get domainEvents(): any[] { return [...this._domainEvents]; }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  public static create(
    id: string,
    nameStr: string,
    ownerId: string,
    slugStr?: string,
    description?: string,
  ): Organization {
    const name = new OrganizationName(nameStr);
    const slug = slugStr ? new OrganizationSlug(slugStr) : OrganizationSlug.createFrom(nameStr);

    const props: OrganizationProps = {
      id,
      name,
      slug,
      ownerId,
    };
    if (description !== undefined) {
      props.description = description;
    }

    const org = new Organization(props);

    org._domainEvents.push(new OrganizationCreatedEvent(org.id, org.name.getValue(), org.slug.getValue(), org.ownerId));
    return org;
  }

  public update(nameStr?: string, description?: string | null): void {
    if (this._status.isDeleted()) {
      throw new Error('Cannot update deleted organization');
    }

    if (nameStr !== undefined) {
      this._name = new OrganizationName(nameStr);
    }
    if (description !== undefined) {
      this._description = description;
    }

    this._updatedAt = new Date();
    this._domainEvents.push(new OrganizationUpdatedEvent(this.id, this._name.getValue()));
  }

  public updateSettings(settingsProps: Parameters<OrganizationSettings['update']>[0]): void {
    if (this._status.isDeleted()) {
      throw new Error('Cannot update settings on deleted organization');
    }
    this._settings = this._settings.update(settingsProps);
    this._updatedAt = new Date();
  }

  public updateBranding(brandingProps: Parameters<OrganizationBranding['update']>[0]): void {
    if (this._status.isDeleted()) {
      throw new Error('Cannot update branding on deleted organization');
    }
    this._branding = this._branding.update(brandingProps);
    this._updatedAt = new Date();
  }

  public updateFeatures(featuresProps: Parameters<OrganizationFeatures['update']>[0]): void {
    if (this._status.isDeleted()) {
      throw new Error('Cannot update features on deleted organization');
    }
    this._features = this._features.update(featuresProps);
    this._updatedAt = new Date();
  }

  public updateLimits(limitsProps: Parameters<OrganizationLimits['update']>[0]): void {
    if (this._status.isDeleted()) {
      throw new Error('Cannot update limits on deleted organization');
    }
    this._limits = this._limits.update(limitsProps);
    this._updatedAt = new Date();
  }

  public delete(): void {
    if (this._status.isDeleted()) {
      throw new Error('Organization is already deleted');
    }
    this._status = OrganizationStatus.deleted();
    this._deletedAt = new Date();
    this._updatedAt = new Date();
    this._domainEvents.push(new OrganizationDeletedEvent(this.id, this._deletedAt));
  }

  public restore(): void {
    if (!this._status.isDeleted()) {
      throw new Error('Organization is not deleted');
    }
    this._status = OrganizationStatus.active();
    this._deletedAt = null;
    this._updatedAt = new Date();
    this._domainEvents.push(new OrganizationRestoredEvent(this.id));
  }
}
