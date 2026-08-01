import { Injectable } from '@nestjs/common';
import { RuleConfig } from '../models/rule-config';

@Injectable()
export class RuleRegistry {
  private readonly rules: Map<string, RuleConfig> = new Map();

  public registerRule(rule: RuleConfig): void {
    this.rules.set(rule.ruleId, rule);
  }

  public unregisterRule(ruleId: string): boolean {
    return this.rules.delete(ruleId);
  }

  public getRule(ruleId: string): RuleConfig | null {
    return this.rules.get(ruleId) ?? null;
  }

  public listRules(): RuleConfig[] {
    return Array.from(this.rules.values()).filter((r) => r.enabled);
  }
}
