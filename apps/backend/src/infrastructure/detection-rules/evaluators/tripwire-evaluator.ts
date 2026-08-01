import { Injectable } from '@nestjs/common';
import { IRuleEvaluator } from './rule-evaluator.interface';
import { RuleConfig } from '../models/rule-config';
import { Zone } from '../zone/zone';
import { TrackedObject } from '../../tracking/models/tracked-object';
import { RuleViolation } from '../models/rule-violation';
import { SegmentIntersection } from '../geometry/segment-intersection';
import { Point2D } from '../zone/point';

@Injectable()
export class TripwireEvaluator implements IRuleEvaluator {
  public evaluate(rule: RuleConfig, zone: Zone, objects: TrackedObject[]): RuleViolation[] {
    const violations: RuleViolation[] = [];
    if (!zone.tripwires || zone.tripwires.length === 0) return violations;

    for (const obj of objects) {
      if (obj.trajectory.length < 2) continue;
      const lastPt = obj.trajectory[obj.trajectory.length - 1];
      const prevPt = obj.trajectory[obj.trajectory.length - 2];
      if (!lastPt || !prevPt) continue;

      const motionStart = new Point2D(prevPt.x, prevPt.y);
      const motionEnd = new Point2D(lastPt.x, lastPt.y);

      for (const tripwire of zone.tripwires) {
        if (SegmentIntersection.doSegmentsIntersect(motionStart, motionEnd, tripwire.p1, tripwire.p2)) {
          violations.push(
            new RuleViolation({
              violationId: `viol-trip-${Date.now()}-${obj.trackId}`,
              ruleId: rule.ruleId,
              ruleType: 'TRIPWIRE',
              zoneId: zone.zoneId,
              trackId: obj.trackId,
              classId: obj.classId,
              className: obj.className,
              confidence: obj.confidence,
              severity: rule.severity,
              timestamp: Date.now(),
              details: {
                tripwireId: tripwire.tripwireId,
                direction: tripwire.direction,
              },
            }),
          );
        }
      }
    }

    return violations;
  }
}
