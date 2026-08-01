import { Injectable } from '@nestjs/common';

export interface RuntimeSelectionCriteria {
  framework: string;
  precision: string;
  gpuVendor?: 'NVIDIA' | 'Intel' | 'AMD' | 'None' | undefined;
  availableVRAMMb: number;
}

@Injectable()
export class RuntimeSelector {
  public selectOptimalRuntime(criteria: RuntimeSelectionCriteria): string {
    const vendor = criteria.gpuVendor ?? 'None';

    // Selection Policy: TensorRT -> OpenVINO -> ONNX Runtime -> PyTorch -> TensorFlow
    if (vendor === 'NVIDIA' && (criteria.framework === 'TensorRT' || criteria.framework === 'ONNX') && criteria.availableVRAMMb >= 1024) {
      return 'TensorRT';
    }

    if (vendor === 'Intel' || (criteria.framework === 'OpenVINO' && criteria.availableVRAMMb >= 512)) {
      return 'OpenVINO';
    }

    if (criteria.framework === 'ONNX' || criteria.framework === 'PyTorch') {
      return 'ONNXRuntime';
    }

    if (criteria.framework === 'PyTorch' || criteria.framework === 'Safetensors') {
      return 'PyTorch';
    }

    return 'TensorFlow';
  }
}
