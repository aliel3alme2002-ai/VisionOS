export interface CameraGroupProps {
  id: string;
  organizationId: string;
  name: string;
  description?: string | null;
}

export class CameraGroup {
  public readonly id: string;
  public readonly organizationId: string;
  private _name: string;
  private _description: string | null;

  constructor(props: CameraGroupProps) {
    this.id = props.id;
    this.organizationId = props.organizationId;
    this._name = props.name;
    this._description = props.description ?? null;
  }

  public get name(): string { return this._name; }
  public get description(): string | null { return this._description; }

  public update(name?: string, description?: string | null): void {
    if (name) this._name = name;
    if (description !== undefined) this._description = description;
  }
}
