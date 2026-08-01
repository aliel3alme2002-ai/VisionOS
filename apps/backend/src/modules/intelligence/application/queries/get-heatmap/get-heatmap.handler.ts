import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetHeatmapQuery } from './get-heatmap.query';
import { HeatmapResponseDto } from '../../../dto/heatmap-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { HeatmapGeneratorService } from '../../../domain/services/heatmap-generator.service';

@QueryHandler(GetHeatmapQuery)
export class GetHeatmapHandler implements BaseQueryHandler<GetHeatmapQuery, HeatmapResponseDto>, IQueryHandler<GetHeatmapQuery> {
  constructor(private readonly heatmapService: HeatmapGeneratorService) {}

  async execute(query: GetHeatmapQuery): Promise<HeatmapResponseDto> {
    const hm = this.heatmapService.generate(query.cameraId, query.timeRange);
    return HeatmapResponseDto.fromEntity(hm);
  }
}
