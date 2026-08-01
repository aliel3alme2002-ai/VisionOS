import { Module } from '@nestjs/common';
import { WorkflowEngineService } from './services/workflow-engine.service';
import { WorkflowRunnerService } from './services/workflow-runner.service';
import { StepExecutorService } from './services/step-executor.service';
import { ConditionRouterService } from './services/condition-router.service';
import { WorkflowBuilderService } from './services/workflow-builder.service';
import { WorkflowValidatorService } from './services/workflow-validator.service';
import { RetryPolicyService } from './services/retry-policy.service';

import { WORKFLOW_REPOSITORY } from './repositories/workflow.repository';
import { WORKFLOW_EXECUTION_REPOSITORY } from './repositories/workflow-execution.repository';
import { WORKFLOW_ACTION_PROVIDER } from './providers/workflow-action.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByOrganization: async () => [],
  save: async () => {},
  delete: async () => {},
  getSteps: async () => [],
  getStepAction: async () => null,
  getStepCondition: async () => null,
  updateStatus: async () => {}
};

const dummyProvider = {
  execute: async () => true
};

@Module({
  providers: [
    WorkflowEngineService,
    WorkflowRunnerService,
    StepExecutorService,
    ConditionRouterService,
    WorkflowBuilderService,
    WorkflowValidatorService,
    RetryPolicyService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: WORKFLOW_REPOSITORY, useValue: dummyRepository },
    { provide: WORKFLOW_EXECUTION_REPOSITORY, useValue: dummyRepository },
    { provide: WORKFLOW_ACTION_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    WorkflowEngineService,
    WorkflowBuilderService,
    WorkflowValidatorService
  ],
})
export class WorkflowModule {}
