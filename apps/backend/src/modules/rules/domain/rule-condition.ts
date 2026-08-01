export type RuleOperator = 
  | 'EQUAL' | 'NOT_EQUAL' | 'GREATER_THAN' | 'LESS_THAN' 
  | 'GREATER_OR_EQUAL' | 'LESS_OR_EQUAL' | 'IN' | 'NOT_IN' 
  | 'INSIDE_ZONE' | 'OUTSIDE_ZONE' | 'FOR_DURATION' 
  | 'EXISTS' | 'NOT_EXISTS';

export type LogicalOperator = 'AND' | 'OR';

export interface RuleCondition {
  id: string;
  ruleId: string;
  leftOperand: string;
  operator: RuleOperator;
  rightOperand: string;
  logicalOperator?: LogicalOperator;
}
