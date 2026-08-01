import { Module } from '@nestjs/common';
import { RuntimeRegistry } from './manager/runtime-registry';
import { RuntimeManager } from './manager/runtime-manager';
import { ModelLoader } from './loader/model-loader';
import { RuntimeLoader } from './loader/runtime-loader';
import { QueueManager } from './scheduler/queue-manager';
import { InferenceScheduler } from './scheduler/inference-scheduler';
import { BatchExecutor } from './execution/batch-executor';
import { ExecutionEngine } from './execution/execution-engine';
import { MemoryManager } from './memory/memory-manager';
import { GpuManager } from './memory/gpu-manager';
import { CpuManager } from './memory/cpu-manager';
import { OnnxRuntimePlugin } from './plugins/onnx-runtime.plugin';
import { TensorRtPlugin } from './plugins/tensorrt.plugin';
import { OpenVinoPlugin } from './plugins/openvino.plugin';
import { PyTorchPlugin } from './plugins/pytorch.plugin';
import { TensorFlowPlugin } from './plugins/tensorflow.plugin';
import { PerformanceMonitor } from './monitoring/performance-monitor';
import { HealthMonitor } from './monitoring/health-monitor';
import { RuntimeMonitor } from './monitoring/runtime-monitor';

@Module({
  providers: [
    RuntimeRegistry,
    RuntimeManager,
    ModelLoader,
    RuntimeLoader,
    QueueManager,
    InferenceScheduler,
    BatchExecutor,
    ExecutionEngine,
    MemoryManager,
    GpuManager,
    CpuManager,
    OnnxRuntimePlugin,
    TensorRtPlugin,
    OpenVinoPlugin,
    PyTorchPlugin,
    TensorFlowPlugin,
    PerformanceMonitor,
    HealthMonitor,
    RuntimeMonitor,
  ],
  exports: [
    RuntimeManager,
    RuntimeRegistry,
    InferenceScheduler,
    ExecutionEngine,
    RuntimeMonitor,
    MemoryManager,
    GpuManager,
    CpuManager,
  ],
})
export class RuntimeModule {}
