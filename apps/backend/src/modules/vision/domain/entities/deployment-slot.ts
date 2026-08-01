export interface DeploymentSlotProps {
  id: string;
  edgeNodeId: string;
  slotNumber: number;
  runtime: string;
  status?: string;
}

export class DeploymentSlot {
  public readonly id: string;
  public readonly edgeNodeId: string;
  public readonly slotNumber: number;
  public readonly runtime: string;
  public status: string;

  constructor(props: DeploymentSlotProps) {
    this.id = props.id;
    this.edgeNodeId = props.edgeNodeId;
    this.slotNumber = props.slotNumber;
    this.runtime = props.runtime;
    this.status = props.status ?? 'IDLE';
  }
}
