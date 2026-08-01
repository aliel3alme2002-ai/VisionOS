import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DetectionsController } from './controllers/detections.controller';
import { EventsController } from './controllers/events.controller';
import { RulesController } from './controllers/rules.controller';
import { ZonesController } from './controllers/zones.controller';
import { TrackingController } from './controllers/tracking.controller';

import { CreateDetectionHandler } from './application/commands/create-detection/create-detection.handler';
import { CreateRuleHandler } from './application/commands/create-rule/create-rule.handler';
import { UpdateRuleHandler } from './application/commands/update-rule/update-rule.handler';
import { CreateZoneHandler } from './application/commands/create-zone/create-zone.handler';
import { CreateLineHandler } from './application/commands/create-line/create-line.handler';
import { EvaluateRulesHandler } from './application/commands/evaluate-rules/evaluate-rules.handler';

import { GetDetectionHandler } from './application/queries/get-detection/get-detection.handler';
import { ListDetectionsHandler } from './application/queries/list-detections/list-detections.handler';
import { GetTrackedObjectHandler } from './application/queries/get-tracked-object/get-tracked-object.handler';
import { ListTrackedObjectsHandler } from './application/queries/list-tracked-objects/list-tracked-objects.handler';
import { GetEventHandler } from './application/queries/get-event/get-event.handler';
import { ListEventsHandler } from './application/queries/list-events/list-events.handler';
import { GetRuleHandler } from './application/queries/get-rule/get-rule.handler';
import { ListRulesHandler } from './application/queries/list-rules/list-rules.handler';
import { GetZoneHandler } from './application/queries/get-zone/get-zone.handler';
import { ListZonesHandler } from './application/queries/list-zones/list-zones.handler';
import { GetHeatmapHandler } from './application/queries/get-heatmap/get-heatmap.handler';
import { GetOccupancyHandler } from './application/queries/get-occupancy/get-occupancy.handler';

import { TrackingEngineService } from './domain/services/tracking-engine.service';
import { ZoneEvaluationService } from './domain/services/zone-evaluation.service';
import { RuleEvaluationService } from './domain/services/rule-evaluation.service';
import { HeatmapGeneratorService } from './domain/services/heatmap-generator.service';
import {
  InMemoryDetectionRepository,
  InMemoryTrackedObjectRepository,
  InMemoryRuleRepository,
  InMemoryZoneRepository,
  InMemoryEventRepository,
} from './domain/repositories/in-memory-intelligence.repository';

const CommandHandlers = [
  CreateDetectionHandler,
  CreateRuleHandler,
  UpdateRuleHandler,
  CreateZoneHandler,
  CreateLineHandler,
  EvaluateRulesHandler,
];

const QueryHandlers = [
  GetDetectionHandler,
  ListDetectionsHandler,
  GetTrackedObjectHandler,
  ListTrackedObjectsHandler,
  GetEventHandler,
  ListEventsHandler,
  GetRuleHandler,
  ListRulesHandler,
  GetZoneHandler,
  ListZonesHandler,
  GetHeatmapHandler,
  GetOccupancyHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    DetectionsController,
    EventsController,
    RulesController,
    ZonesController,
    TrackingController,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    TrackingEngineService,
    ZoneEvaluationService,
    RuleEvaluationService,
    HeatmapGeneratorService,
    InMemoryDetectionRepository,
    InMemoryTrackedObjectRepository,
    InMemoryRuleRepository,
    InMemoryZoneRepository,
    InMemoryEventRepository,
    { provide: 'IDetectionRepository', useClass: InMemoryDetectionRepository },
    { provide: 'ITrackedObjectRepository', useClass: InMemoryTrackedObjectRepository },
    { provide: 'IRuleRepository', useClass: InMemoryRuleRepository },
    { provide: 'IZoneRepository', useClass: InMemoryZoneRepository },
    { provide: 'IEventRepository', useClass: InMemoryEventRepository },
  ],
  exports: [
    TrackingEngineService,
    ZoneEvaluationService,
    RuleEvaluationService,
    HeatmapGeneratorService,
    'IDetectionRepository',
    'ITrackedObjectRepository',
    'IRuleRepository',
    'IZoneRepository',
    'IEventRepository',
  ],
})
export class IntelligenceModule {}
