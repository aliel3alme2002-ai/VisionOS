import { Frame } from './frame';

export interface FrameBatchProps {
  batchId: string;
  sourceId: string;
  frames: Frame[];
  createdAt: Date;
}

export class FrameBatch implements FrameBatchProps {
  public readonly batchId: string;
  public readonly sourceId: string;
  public readonly frames: Frame[];
  public readonly createdAt: Date;

  constructor(props: FrameBatchProps) {
    this.batchId = props.batchId;
    this.sourceId = props.sourceId;
    this.frames = props.frames;
    this.createdAt = props.createdAt;
  }
}
