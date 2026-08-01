import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetOccupancyQuery } from './get-occupancy.query';
import { OccupancyResponseDto } from '../../../dto/occupancy-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { Occupancy } from '../../../domain/entities/occupancy';
import { randomUUID } from 'crypto';

@QueryHandler(GetOccupancyQuery)
export class GetOccupancyHandler implements BaseQueryHandler<GetOccupancyQuery, OccupancyResponseDto>, IQueryHandler<GetOccupancyQuery> {
  async execute(query: GetOccupancyQuery): Promise<OccupancyResponseDto> {
    const occ = new Occupancy({ id: randomUUID(), zoneId: query.zoneId, currentCount: 14 });
    return OccupancyResponseDto.fromEntity(occ);
  }
}
