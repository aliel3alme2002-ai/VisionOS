import { Injectable } from '@nestjs/common';
import { Frame } from '../../video/frame/frame';
import { LiveFrameQueue } from '../queue/frame-queue';
import { StreamPriorityQueue } from '../queue/priority-queue';

@Injectable()
export class FrameRouter {
  public routeFrame(frame: Frame, priority: number, queue: LiveFrameQueue, pQueue: StreamPriorityQueue): void {
    if (priority > 5) {
      pQueue.push(frame, priority);
    } else {
      queue.enqueue(frame);
    }
  }
}
