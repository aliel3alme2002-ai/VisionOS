export interface EventPublication {
  id: string;
  eventName: string;
  publishedAt: Date;
  status: string;
  retryCount: number;
}
