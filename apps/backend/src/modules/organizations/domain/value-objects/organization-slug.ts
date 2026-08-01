export class OrganizationSlug {
  private static readonly SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('Organization slug cannot be empty');
    }
    if (!OrganizationSlug.SLUG_REGEX.test(value)) {
      throw new Error('Organization slug must be lowercase alphanumeric with single hyphens');
    }
  }

  public getValue(): string {
    return this.value;
  }

  public static createFrom(name: string): OrganizationSlug {
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return new OrganizationSlug(slug || 'org');
  }
}
