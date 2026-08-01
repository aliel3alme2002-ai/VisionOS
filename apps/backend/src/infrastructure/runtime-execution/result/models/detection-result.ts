import { DetectionBox } from './detection-box';

export interface Point2D {
  x: number;
  y: number;
}

export interface DetectionResultProps {
  trackingCandidateId: string;
  classId: number;
  className: string;
  confidence: number;
  boundingBox: DetectionBox;
  center: Point2D;
  area: number;
  timestamp: number;
  segmentationMask?: number[][] | undefined;
}

export class DetectionResult implements DetectionResultProps {
  public readonly trackingCandidateId: string;
  public readonly classId: number;
  public readonly className: string;
  public readonly confidence: number;
  public readonly boundingBox: DetectionBox;
  public readonly center: Point2D;
  public readonly area: number;
  public readonly timestamp: number;
  public readonly segmentationMask?: number[][] | undefined;

  constructor(props: DetectionResultProps) {
    this.trackingCandidateId = props.trackingCandidateId;
    this.classId = props.classId;
    this.className = props.className;
    this.confidence = props.confidence;
    this.boundingBox = props.boundingBox;
    this.center = props.center;
    this.area = props.area;
    this.timestamp = props.timestamp;
    this.segmentationMask = props.segmentationMask;
  }
}
