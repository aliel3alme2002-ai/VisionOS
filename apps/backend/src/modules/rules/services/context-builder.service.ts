import { Injectable, Inject } from '@nestjs/common';
import { RuleContext } from '../domain/rule-context';
import { RuleVariableProvider, RULE_VARIABLE_PROVIDER } from '../providers/rule-variable.provider';

@Injectable()
export class ContextBuilderService {
  constructor(
    @Inject(RULE_VARIABLE_PROVIDER) private readonly variableProvider: RuleVariableProvider
  ) {}

  async buildContext(rawEvent: any): Promise<RuleContext> {
    const dummyVar = await this.variableProvider.resolveVariable('dummy', rawEvent);
    
    // A placeholder for building full context
    return {
      detectionResultId: rawEvent.resultId || 'none',
      cameraId: rawEvent.cameraId || 'none',
      modelId: rawEvent.modelId || 'none',
      edgeId: rawEvent.edgeId || 'none',
      timestamp: new Date(),
      organizationId: rawEvent.organizationId || 'none',
      variables: {
        dummy: dummyVar.value
      }
    };
  }
}
