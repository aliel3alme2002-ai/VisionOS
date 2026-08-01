export type RuntimeCapabilityCategory = 'Detection' | 'Classification' | 'Segmentation' | 'Pose' | 'OCR' | 'Face_Recognition' | 'Tracking' | 'Counting' | 'Depth' | 'Custom';

export interface RuntimeCapability {
  id: string;
  name: string;
  category: RuntimeCapabilityCategory;
  enabled: boolean;
}
