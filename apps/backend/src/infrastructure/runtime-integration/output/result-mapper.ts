export interface BoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DetectedObject {
  label: string;
  classId: number;
  confidence: number;
  box: BoundingBox;
  mask?: number[][] | undefined;
  keypoints?: number[][] | undefined;
}

export interface IntegratedInferenceResultProps {
  success: boolean;
  modelId: string;
  runtimeUsed: string;
  executionTimeMs: number;
  fps: number;
  objects: DetectedObject[];
  boundingBoxes: BoundingBox[];
  scores: number[];
  classes: string[];
  masks?: number[][][] | undefined;
  keypoints?: number[][][] | undefined;
  error?: string | undefined;
}

export class IntegratedInferenceResult implements IntegratedInferenceResultProps {
  public readonly success: boolean;
  public readonly modelId: string;
  public readonly runtimeUsed: string;
  public readonly executionTimeMs: number;
  public readonly fps: number;
  public readonly objects: DetectedObject[];
  public readonly boundingBoxes: BoundingBox[];
  public readonly scores: number[];
  public readonly classes: string[];
  public readonly masks?: number[][][] | undefined;
  public readonly keypoints?: number[][][] | undefined;
  public readonly error?: string | undefined;

  constructor(props: IntegratedInferenceResultProps) {
    this.success = props.success;
    this.modelId = props.modelId;
    this.runtimeUsed = props.runtimeUsed;
    this.executionTimeMs = props.executionTimeMs;
    this.fps = props.fps;
    this.objects = props.objects;
    this.boundingBoxes = props.boundingBoxes;
    this.scores = props.scores;
    this.classes = props.classes;
    this.masks = props.masks;
    this.keypoints = props.keypoints;
    this.error = props.error;
  }
}
