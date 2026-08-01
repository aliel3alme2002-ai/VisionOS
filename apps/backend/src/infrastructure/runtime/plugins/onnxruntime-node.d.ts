declare module 'onnxruntime-node' {
  export class Tensor {
    constructor(type: string, data: Float32Array | Int32Array | Uint8Array, dims: number[]);
    readonly type: string;
    readonly dims: number[];
    readonly data: Float32Array | Int32Array | Uint8Array;
  }

  export interface InferenceSessionOptions {
    executionProviders?: string[] | undefined;
    graphOptimizationLevel?: string | undefined;
  }

  export class InferenceSession {
    static create(pathOrBuffer: string | Buffer, options?: InferenceSessionOptions): Promise<InferenceSession>;
    readonly inputNames: readonly string[];
    readonly outputNames: readonly string[];
    run(feeds: Record<string, Tensor>): Promise<Record<string, Tensor>>;
    release(): Promise<void>;
  }
}
