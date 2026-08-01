import { RuntimeSessionState } from '../models/runtime-session-state';
import { RuntimeModel } from '../models/runtime-model';

export interface RuntimeSession {
  id: string;
  engine: string;
  state: RuntimeSessionState;
  model?: RuntimeModel;
  startedAt: Date;
}
