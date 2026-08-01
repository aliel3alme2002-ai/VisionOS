import { Module } from '@nestjs/common';
import { RuleEngineService } from './services/rule-engine.service';
import { ConditionEvaluatorService } from './services/condition-evaluator.service';
import { ActionPlannerService } from './services/action-planner.service';
import { ContextBuilderService } from './services/context-builder.service';
import { RuleValidatorService } from './services/rule-validator.service';
import { PriorityService } from './services/priority.service';

import { RULE_REPOSITORY } from './repositories/rule.repository';
import { RULE_GROUP_REPOSITORY } from './repositories/rule-group.repository';

import { RULE_VARIABLE_PROVIDER } from './providers/rule-variable.provider';
import { RULE_ACTION_PROVIDER } from './providers/rule-action.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByOrganization: async () => [],
  findAll: async () => [],
  save: async () => {},
  delete: async () => {},
  getConditions: async () => [],
  getActions: async () => [],
  getFilter: async () => null
};

const dummyProvider = {
  resolveVariable: async () => ({ key: 'dummy', value: null, type: 'string' }),
  executeAction: async () => true
};

@Module({
  providers: [
    RuleEngineService,
    ConditionEvaluatorService,
    ActionPlannerService,
    ContextBuilderService,
    RuleValidatorService,
    PriorityService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: RULE_REPOSITORY, useValue: dummyRepository },
    { provide: RULE_GROUP_REPOSITORY, useValue: dummyRepository },
    
    { provide: RULE_VARIABLE_PROVIDER, useValue: dummyProvider },
    { provide: RULE_ACTION_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    RuleEngineService,
    ContextBuilderService,
    RuleValidatorService
  ],
})
export class RulesModule {}
