export interface DetectionClassProps {
  classId: number;
  className: string;
}

export class DetectionClass implements DetectionClassProps {
  public readonly classId: number;
  public readonly className: string;

  constructor(props: DetectionClassProps) {
    this.classId = props.classId;
    this.className = props.className;
  }
}
