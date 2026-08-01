import { AlertAssignment } from '../domain/alert-assignment';

export class AlertAssignedEvent {
  constructor(
    public readonly assignment: AlertAssignment,
    public readonly timestamp: Date = new Date()
  ) {}
}
