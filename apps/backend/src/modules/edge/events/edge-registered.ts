import { EdgeNode } from '../domain/edge-node';

export class EdgeRegisteredEvent {
  constructor(
    public readonly edge: EdgeNode,
    public readonly timestamp: Date = new Date()
  ) {}
}
