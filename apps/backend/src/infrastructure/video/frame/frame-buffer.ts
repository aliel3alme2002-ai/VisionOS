import { Injectable } from '@nestjs/common';
import { Frame } from './frame';

@Injectable()
export class FrameBuffer {
  private readonly capacity = 100;
  private readonly buffer: Frame[] = [];
  private droppedCount = 0;

  public push(frame: Frame): boolean {
    if (this.buffer.length >= this.capacity) {
      this.buffer.shift(); // Drop oldest frame (Overflow strategy)
      this.droppedCount++;
    }
    this.buffer.push(frame);
    return true;
  }

  public pop(): Frame | null {
    return this.buffer.shift() ?? null;
  }

  public peek(): Frame | null {
    return this.buffer[0] ?? null;
  }

  public size(): number {
    return this.buffer.length;
  }

  public clear(): void {
    this.buffer.length = 0;
  }

  public getDroppedCount(): number {
    return this.droppedCount;
  }
}
