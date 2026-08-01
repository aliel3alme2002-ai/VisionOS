import { Injectable } from '@nestjs/common';
import { Frame } from '../../video/frame/frame';

export interface PriorityFrameItem {
  frame: Frame;
  priority: number;
  enqueuedAt: number;
}

@Injectable()
export class StreamPriorityQueue {
  private readonly items: PriorityFrameItem[] = [];

  public push(frame: Frame, priority: number): void {
    this.items.push({ frame, priority, enqueuedAt: Date.now() });
    this.items.sort((a, b) => b.priority - a.priority);
  }

  public pop(): Frame | null {
    const item = this.items.shift();
    return item?.frame ?? null;
  }

  public size(): number {
    return this.items.length;
  }
}
