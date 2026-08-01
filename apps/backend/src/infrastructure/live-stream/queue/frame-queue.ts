import { Injectable } from '@nestjs/common';
import { Frame } from '../../video/frame/frame';

@Injectable()
export class LiveFrameQueue {
  private readonly maxCapacity = 200;
  private readonly queue: Frame[] = [];
  private overflowCount = 0;

  public enqueue(frame: Frame): boolean {
    if (this.queue.length >= this.maxCapacity) {
      // Backpressure dropping policy (drop oldest frame)
      this.queue.shift();
      this.overflowCount++;
    }
    this.queue.push(frame);
    return true;
  }

  public dequeue(): Frame | null {
    return this.queue.shift() ?? null;
  }

  public size(): number {
    return this.queue.length;
  }

  public clear(): void {
    this.queue.length = 0;
  }

  public getOverflowCount(): number {
    return this.overflowCount;
  }
}
