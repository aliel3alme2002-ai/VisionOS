import { Injectable } from '@nestjs/common';
import { OnnxRuntimePlugin } from '../../runtime/plugins/onnx-runtime.plugin';
import { Yolo11Decoder } from '../../runtime-execution/result/yolo11/yolo11-decoder';
import { DetectionResult } from '../../runtime-execution/result/models/detection-result';
import { ExecutionRequest } from '../../runtime/models/execution-request';

@Injectable()
export class DetectionExecutor {
  constructor(
    private readonly onnxPlugin: OnnxRuntimePlugin,
    private readonly yoloDecoder: Yolo11Decoder,
  ) {}

  public async executeDetection(
    modelId: string,
    floatTensorData: Float32Array,
    timestamp: number,
  ): Promise<DetectionResult[]> {
    // 1. Execute ONNX Runtime Plugin
    const execReq = new ExecutionRequest({
      modelId,
      version: '1.0.0',
      runtime: 'ONNXRuntime',
      input: { tensorData: floatTensorData, shape: [1, 3, 640, 640] },
      batchSize: 1,
      priority: 1,
      timeout: 5000,
      organizationId: 'org-vision',
    });

    const res = await this.onnxPlugin.execute(execReq);
    if (!res.success) return [];

    // 2. Decode raw ONNX output tensor using YOLO11 Decoder
    const rawOutput = Object.values(res.outputs)[0] as { data?: Float32Array; dims?: number[] } | undefined;
    const data = rawOutput?.data instanceof Float32Array ? rawOutput.data : new Float32Array(84 * 8400);
    const dims = rawOutput?.dims ?? [1, 84, 8400];

    return this.yoloDecoder.decode({
      tensorData: data,
      dims,
      confidenceThreshold: 0.25,
      iouThreshold: 0.45,
      imgWidth: 640,
      imgHeight: 640,
      timestamp,
    });
  }
}
