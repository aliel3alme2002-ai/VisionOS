import { Injectable } from '@nestjs/common';

export interface ProfileReport {
  preprocessTimeMs: number;
  inferenceTimeMs: number;
  postprocessTimeMs: number;
  totalLatencyMs: number;
  memoryAllocatedMb: number;
}

@Injectable()
export class RuntimeProfilerService {
  public profileExecution(
    preprocessMs: number,
    inferenceMs: number,
    postprocessMs: number,
    memoryMb: number,
  ): ProfileReport {
    return {
      preprocessTimeMs: preprocessMs,
      inferenceTimeMs: inferenceMs,
      postprocessTimeMs: postprocessMs,
      totalLatencyMs: preprocessMs + inferenceMs + postprocessMs,
      memoryAllocatedMb: memoryMb,
    };
  }
}
