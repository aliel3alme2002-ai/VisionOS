import { Injectable, OnModuleInit } from '@nestjs/common';
import { RuntimeRegistry } from '../manager/runtime-registry';
import { OnnxRuntimePlugin } from '../plugins/onnx-runtime.plugin';
import { TensorRtPlugin } from '../plugins/tensorrt.plugin';
import { OpenVinoPlugin } from '../plugins/openvino.plugin';
import { PyTorchPlugin } from '../plugins/pytorch.plugin';
import { TensorFlowPlugin } from '../plugins/tensorflow.plugin';

@Injectable()
export class RuntimeLoader implements OnModuleInit {
  constructor(
    private readonly registry: RuntimeRegistry,
    private readonly onnx: OnnxRuntimePlugin,
    private readonly tensorrt: TensorRtPlugin,
    private readonly openvino: OpenVinoPlugin,
    private readonly pytorch: PyTorchPlugin,
    private readonly tensorflow: TensorFlowPlugin,
  ) {}

  public async onModuleInit(): Promise<void> {
    this.registry.registerPlugin(this.onnx);
    this.registry.registerPlugin(this.tensorrt);
    this.registry.registerPlugin(this.openvino);
    this.registry.registerPlugin(this.pytorch);
    this.registry.registerPlugin(this.tensorflow);

    for (const plugin of this.registry.listPlugins()) {
      await plugin.initialize();
    }
  }
}
