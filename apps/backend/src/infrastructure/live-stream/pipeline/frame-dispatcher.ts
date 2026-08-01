import { Injectable } from '@nestjs/common';
import { Frame } from '../../video/frame/frame';
import { RuntimeExecutionProvider } from '../../runtime-integration/providers/runtime-execution.provider';
import { IntegratedInferenceResult } from '../../runtime-integration/output/result-mapper';

@Injectable()
export class FrameDispatcher {
  constructor(private readonly executionProvider: RuntimeExecutionProvider) {}

  public async dispatchFrame(frame: Frame, modelId: string): Promise<IntegratedInferenceResult> {
    return this.executionProvider.executeInference({
      image: Buffer.from(frame.buffer),
      modelId,
      batchSize: 1,
    });
  }
}
