import { ModelRuntime } from '../domain/model-runtime';

export interface ModelRuntimeProvider {
  configureRuntime(deploymentId: string, runtime: ModelRuntime): Promise<boolean>;
  stopRuntime(deploymentId: string): Promise<boolean>;
}

export const MODEL_RUNTIME_PROVIDER = Symbol('MODEL_RUNTIME_PROVIDER');
