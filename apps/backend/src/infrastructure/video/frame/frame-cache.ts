import { Injectable } from '@nestjs/common';
import { Frame } from './frame';

@Injectable()
export class FrameCache {
  private readonly cache: Map<number, Frame> = new Map();

  public cacheFrame(frame: Frame): void {
    this.cache.set(frame.index, frame);
  }

  public getFrame(index: number): Frame | null {
    return this.cache.get(index) ?? null;
  }

  public clear(): void {
    this.cache.clear();
  }
}
