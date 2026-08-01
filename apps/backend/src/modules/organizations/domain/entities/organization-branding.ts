export interface OrganizationBrandingProps {
  logoUrl?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  faviconUrl?: string | null;
}

export class OrganizationBranding {
  public readonly logoUrl: string | null;
  public readonly primaryColor: string | null;
  public readonly secondaryColor: string | null;
  public readonly faviconUrl: string | null;

  constructor(props?: OrganizationBrandingProps) {
    this.logoUrl = props?.logoUrl ?? null;
    this.primaryColor = props?.primaryColor ?? null;
    this.secondaryColor = props?.secondaryColor ?? null;
    this.faviconUrl = props?.faviconUrl ?? null;
  }

  public update(props: Partial<OrganizationBrandingProps>): OrganizationBranding {
    return new OrganizationBranding({
      logoUrl: props.logoUrl !== undefined ? props.logoUrl : this.logoUrl,
      primaryColor: props.primaryColor !== undefined ? props.primaryColor : this.primaryColor,
      secondaryColor: props.secondaryColor !== undefined ? props.secondaryColor : this.secondaryColor,
      faviconUrl: props.faviconUrl !== undefined ? props.faviconUrl : this.faviconUrl,
    });
  }
}
