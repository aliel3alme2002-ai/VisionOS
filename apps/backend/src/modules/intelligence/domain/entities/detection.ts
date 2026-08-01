import { TrackedObject } from './tracked-object';

export interface DetectionProps {
  id: string;
  cameraId: string;
  pipelineId: string;
  runtimeId: string;
  frameId: string;
  timestamp?: Date;
  objects?: TrackedObject[];
}

export class Detection {
  public readonly id: string;
  public readonly cameraId: string;
  public readonly pipelineId: string;
  public readonly runtimeId: string;
  public readonly frameId: string;
  public readonly timestamp: Date;
  private _objects: TrackedObject[];

  constructor(props: DetectionProps) {
    this.id = props.id;
    this.cameraId = props.cameraId;
    this.pipelineId = props.pipelineId;
    this.runtimeId = props.runtimeId;
    this.frameId = props.frameId;
    this.timestamp = props.timestamp ?? new Date();
    this._objects = props.objects ?? [];
  }

  public get objects(): readonly TrackedObject[] { return [...this._objects]; }

  public addObject(obj: TrackedObject): void {
    this._objects.push(obj);
  }
}
