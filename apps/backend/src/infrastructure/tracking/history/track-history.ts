import { Injectable } from '@nestjs/common';
import { Trajectory } from './trajectory';

@Injectable()
export class TrackHistory {
  private readonly trajectories: Map<string, Trajectory> = new Map();

  public recordPosition(trackId: string, x: number, y: number, timestamp: number): Trajectory {
    let trajectory = this.trajectories.get(trackId);
    if (!trajectory) {
      trajectory = new Trajectory();
      this.trajectories.set(trackId, trajectory);
    }
    trajectory.addPoint(x, y, timestamp);
    return trajectory;
  }

  public removeHistory(trackId: string): void {
    this.trajectories.delete(trackId);
  }
}
