import { Injectable } from '@nestjs/common';
import { IRuleEvaluator } from './rule-evaluator.interface';
import { RuleConfig } from '../models/rule-config';
import { Zone } from '../zone/zone';
import { TrackedObject } from '../../tracking/models/tracked-object';
import { RuleViolation } from '../models/rule-violation';
import { RayCasting } from '../geometry/ray-casting';
import { Point2D } from '../zone/point';

@Injectable()
export class IntrusionEvaluator implements IRuleEvaluator {
  public evaluate(rule: RuleConfig, zone: Zone, objects: TrackedObject[]): RuleViolation[] {
    const violations: RuleViolation[] = [];

    for (const obj of objects) {
      if (!rule.targetClasses.includes(obj.className) && !rule.targetClasses.includes('*')) {
        continue;
      }
      if (obj.confidence < rule.minConfidence) continue;

      const centerPoint = new Point2D(
        obj.boundingBox.xPixel + obj.boundingBox.widthPixel / 2,
        obj.boundingBox.yPixel + obj.boundingBox.heightPixel / 2,
      );

      if (RayCasting.isPointInPolygon(centerPoint, zone.polygon)) {
        violations.push(
          new RuleViolation({
            violationId: `viol-int-${Date.now()}-${obj.trackId}`,
            ruleId: rule.ruleId,
            ruleType: 'INTRUSION',
            zoneId: zone.zoneId,
            trackId: obj.trackId,
            classId: obj.classId,
            className: obj.className,
            confidence: obj.confidence,
            severity: rule.severity,
            timestamp: Date.now(),
            details: {
              zoneName: zone.name,
              position: { x: centerPoint.x, y: centerPoint.y },
            },
          }),
        );
      }
    }

    return violations;
  }
}
