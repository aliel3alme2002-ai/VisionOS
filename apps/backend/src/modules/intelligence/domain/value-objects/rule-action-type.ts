export enum RuleActionTypeEnum {
  CREATE_ALERT = 'Create Alert',
  START_RECORDING = 'Start Recording',
  STOP_RECORDING = 'Stop Recording',
  TAKE_SNAPSHOT = 'Take Snapshot',
  SEND_NOTIFICATION = 'Send Notification',
  EXECUTE_WORKFLOW = 'Execute Workflow',
  PUBLISH_EVENT = 'Publish Event',
  WEBHOOK = 'Webhook',
}

export class RuleActionType {
  constructor(private readonly value: RuleActionTypeEnum) {}

  public getValue(): RuleActionTypeEnum { return this.value; }

  public static create(typeStr: string): RuleActionType {
    const matched = Object.values(RuleActionTypeEnum).find((v) => v.toLowerCase() === typeStr.toLowerCase());
    if (!matched) {
      throw new Error(`Invalid rule action type: ${typeStr}`);
    }
    return new RuleActionType(matched);
  }
}
