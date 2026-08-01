import { ModelStatus } from '../enums/model-status';

export interface AIModelCapabilities {
  person: boolean;
  vehicle: boolean;
  face: boolean;
  fire: boolean;
  smoke: boolean;
  ppe: boolean;
  pose: boolean;
  drowning: boolean;
  custom: boolean;
}

export interface AIModel {
  id: string;
  name: string;
  version: string;
  framework: string;
  runtime: string;
  status: ModelStatus;
  capabilities: AIModelCapabilities;
}
