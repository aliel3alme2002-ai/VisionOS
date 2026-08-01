export type RuleActionType = 
  | 'CREATE_ALERT' | 'START_RECORDING' | 'STOP_RECORDING' 
  | 'TAKE_SNAPSHOT' | 'CALL_WEBHOOK' | 'SEND_NOTIFICATION' 
  | 'RUN_WORKFLOW';

export interface RuleAction {
  id: string;
  ruleId: string;
  type: RuleActionType;
  parameters: Record<string, unknown>;
  order: number;
}
