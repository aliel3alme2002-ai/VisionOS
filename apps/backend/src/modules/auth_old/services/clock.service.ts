import { Injectable } from '@nestjs/common';

@Injectable()
export class ClockService {
  public now(): Date {
    return new Date();
  }

  public utcNow(): Date {
    const now = new Date();
    return new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  }
}
