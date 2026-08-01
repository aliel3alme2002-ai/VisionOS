export interface AlertActionProvider {
  triggerExternalSystem(alertId: string, actionType: string): Promise<boolean>;
}

export const ALERT_ACTION_PROVIDER = Symbol('ALERT_ACTION_PROVIDER');
