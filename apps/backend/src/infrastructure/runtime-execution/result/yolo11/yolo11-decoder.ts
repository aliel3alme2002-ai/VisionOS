import { Injectable } from '@nestjs/common';
import { Yolo11Parser } from './yolo11-parser';
import { Yolo11Nms } from './yolo11-nms';
import { Yolo11LabelMapper } from './yolo11-label-mapper';
import { DetectionResult } from '../models/detection-result';

export interface Yolo11DecodeOptions {
  tensorData: Float32Array;
  dims: number[];
  confidenceThreshold?: number | undefined;
  iouThreshold?: number | undefined;
  imgWidth?: number | undefined;
  imgHeight?: number | undefined;
  metadataLabels?: Record<number, string> | undefined;
  timestamp?: number | undefined;
}

@Injectable()
export class Yolo11Decoder {
  constructor(
    private readonly parser: Yolo11Parser,
    private readonly nms: Yolo11Nms,
    private readonly labelMapper: Yolo11LabelMapper,
  ) {}

  public decode(options: Yolo11DecodeOptions): DetectionResult[] {
    const confThreshold = options.confidenceThreshold ?? 0.25;
    const iouThreshold = options.iouThreshold ?? 0.45;
    const imgWidth = options.imgWidth ?? 640;
    const imgHeight = options.imgHeight ?? 640;
    const timestamp = options.timestamp ?? Date.now();

    // 1. Parse Raw Tensors -> Candidates
    const candidates = this.parser.parseTensorOutputs(
      options.tensorData,
      options.dims,
      confThreshold,
      imgWidth,
      imgHeight,
    );

    // 2. Perform Real NMS Suppression
    const nmsResults = this.nms.suppress(candidates, iouThreshold);

    // 3. Map to sorted DetectionResult array (highest confidence first)
    return nmsResults
      .sort((a, b) => b.confidence - a.confidence)
      .map((item, idx) => {
        const className = this.labelMapper.getClassName(item.classId, options.metadataLabels);
        const center = {
          x: item.box.xPixel + item.box.widthPixel / 2,
          y: item.box.yPixel + item.box.heightPixel / 2,
        };
        const area = item.box.widthPixel * item.box.heightPixel;

        return new DetectionResult({
          trackingCandidateId: `cand-${timestamp}-${idx}`,
          classId: item.classId,
          className,
          confidence: item.confidence,
          boundingBox: item.box,
          center,
          area,
          timestamp,
        });
      });
  }
}
