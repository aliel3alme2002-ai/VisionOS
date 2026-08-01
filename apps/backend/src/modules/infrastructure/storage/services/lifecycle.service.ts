import { Injectable } from '@nestjs/common';
import { ObjectLifecycleState } from '../models/storage-object';

@Injectable()
export class LifecycleService {
  private states: Map<string, ObjectLifecycleState> = new Map();

  transitionState(objectId: string, nextState: ObjectLifecycleState): void {
    this.states.set(objectId, nextState);
  }

  getState(objectId: string): ObjectLifecycleState {
    return this.states.get(objectId) || 'AVAILABLE';
  }
}
