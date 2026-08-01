import { ExecutionRequest } from '../models/execution-request';
import { ExecutionResult } from '../models/execution-result';

export interface RuntimePlugin {
  readonly pluginName: string;
  readonly supportedFrameworks: string[];

  initialize(): Promise<void>;
  loadModel(modelId: string, modelPath: string): Promise<boolean>;
  execute(request: ExecutionRequest): Promise<ExecutionResult>;
  unloadModel(modelId: string): Promise<boolean>;
  dispose(): Promise<void>;
}
