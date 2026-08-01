import { Module } from '@nestjs/common';
import { AlertEngineService } from './services/alert-engine.service';
import { AlertLifecycleService } from './services/alert-lifecycle.service';
import { AlertAssignmentService } from './services/alert-assignment.service';
import { AlertEscalationService } from './services/alert-escalation.service';
import { AlertValidatorService } from './services/alert-validator.service';

import { ALERT_REPOSITORY } from './repositories/alert.repository';
import { ALERT_HISTORY_REPOSITORY } from './repositories/alert-history.repository';
import { ALERT_ACTION_PROVIDER } from './providers/alert-action.provider';

// Dummy implementation for compilation
const dummyRepository = {
  findById: async () => null,
  findByOrganization: async () => [],
  save: async () => {},
  updateStatus: async () => {},
  findByAlert: async () => []
};

const dummyProvider = {
  triggerExternalSystem: async () => true
};

@Module({
  providers: [
    AlertEngineService,
    AlertLifecycleService,
    AlertAssignmentService,
    AlertEscalationService,
    AlertValidatorService,
    
    // Dummy providers for DI to compile without infrastructure
    { provide: ALERT_REPOSITORY, useValue: dummyRepository },
    { provide: ALERT_HISTORY_REPOSITORY, useValue: dummyRepository },
    { provide: ALERT_ACTION_PROVIDER, useValue: dummyProvider }
  ],
  exports: [
    AlertEngineService,
    AlertLifecycleService,
    AlertAssignmentService,
    AlertEscalationService
  ],
})
export class AlertModule {}
