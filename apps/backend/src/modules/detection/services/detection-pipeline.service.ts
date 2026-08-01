import { Injectable, Inject } from '@nestjs/common';
import { DetectionJobRepository, DETECTION_JOB_REPOSITORY } from '../repositories/detection-job.repository';
import { DetectionJob } from '../domain/detection-job';

@Injectable()
export class DetectionPipelineService {
  constructor(
    @Inject(DETECTION_JOB_REPOSITORY) private readonly jobRepo: DetectionJobRepository
  ) {}

  async startJob(job: DetectionJob): Promise<void> {
    await this.jobRepo.save(job);
  }

  async stopJob(jobId: string): Promise<void> {
    await this.jobRepo.updateStatus(jobId, 'STOPPED');
  }
}
