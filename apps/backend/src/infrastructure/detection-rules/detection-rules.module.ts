import { Module } from '@nestjs/common';
import { RayCasting } from './geometry/ray-casting';
import { SegmentIntersection } from './geometry/segment-intersection';
import { SpatialMath } from './geometry/spatial-math';
import { IntrusionEvaluator } from './evaluators/intrusion-evaluator';
import { LoiteringEvaluator } from './evaluators/loitering-evaluator';
import { TripwireEvaluator } from './evaluators/tripwire-evaluator';
import { CrowdDensityEvaluator } from './evaluators/crowd-density-evaluator';
import { OccupancyEvaluator } from './evaluators/occupancy-evaluator';
import { ZoneManager } from './engine/zone-manager';
import { RuleRegistry } from './engine/rule-registry';
import { RuleExecutionEngine } from './engine/rule-execution-engine';

@Module({
  providers: [
    RayCasting,
    SegmentIntersection,
    SpatialMath,
    IntrusionEvaluator,
    LoiteringEvaluator,
    TripwireEvaluator,
    CrowdDensityEvaluator,
    OccupancyEvaluator,
    ZoneManager,
    RuleRegistry,
    RuleExecutionEngine,
  ],
  exports: [
    RuleExecutionEngine,
    ZoneManager,
    RuleRegistry,
    IntrusionEvaluator,
    LoiteringEvaluator,
  ],
})
export class DetectionRulesModule {}
