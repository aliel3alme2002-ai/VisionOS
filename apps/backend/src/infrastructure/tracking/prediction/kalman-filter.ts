import { Injectable } from '@nestjs/common';

export interface KalmanState {
  cx: number;
  cy: number;
  s: number; // Scale / Area
  r: number; // Aspect Ratio
  vx: number;
  vy: number;
  vs: number;
  vr: number;
}

@Injectable()
export class KalmanFilter {
  public initiateState(cx: number, cy: number, w: number, h: number): KalmanState {
    const s = w * h;
    const r = h > 0 ? w / h : 1.0;
    return {
      cx,
      cy,
      s,
      r,
      vx: 0,
      vy: 0,
      vs: 0,
      vr: 0,
    };
  }

  public predict(state: KalmanState, dtMs = 33): KalmanState {
    const dt = dtMs / 1000.0;
    return {
      cx: state.cx + state.vx * dt,
      cy: state.cy + state.vy * dt,
      s: state.s + state.vs * dt,
      r: state.r,
      vx: state.vx,
      vy: state.vy,
      vs: state.vs,
      vr: state.vr,
    };
  }

  public update(state: KalmanState, measurementCx: number, measurementCy: number, w: number, h: number, dtMs = 33): KalmanState {
    const dt = dtMs / 1000.0;
    const newS = w * h;
    const newR = h > 0 ? w / h : 1.0;

    const alpha = 0.6; // Smoothing gain factor
    const newCx = state.cx + alpha * (measurementCx - state.cx);
    const newCy = state.cy + alpha * (measurementCy - state.cy);

    const measuredVx = dt > 0 ? (measurementCx - state.cx) / dt : 0;
    const measuredVy = dt > 0 ? (measurementCy - state.cy) / dt : 0;

    const newVx = state.vx + alpha * (measuredVx - state.vx);
    const newVy = state.vy + alpha * (measuredVy - state.vy);

    return {
      cx: newCx,
      cy: newCy,
      s: newS,
      r: newR,
      vx: newVx,
      vy: newVy,
      vs: 0,
      vr: 0,
    };
  }
}
