import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListZonesQuery } from './list-zones.query';
import { ZoneResponseDto } from '../../../dto/zone-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IZoneRepository } from '../../../domain/repositories/zone.repository';

@QueryHandler(ListZonesQuery)
export class ListZonesHandler implements BaseQueryHandler<ListZonesQuery, ZoneResponseDto[]>, IQueryHandler<ListZonesQuery> {
  constructor(@Inject('IZoneRepository') private readonly repository: IZoneRepository) {}

  async execute(query: ListZonesQuery): Promise<ZoneResponseDto[]> {
    const list = await this.repository.findByCameraId(query.cameraId);
    return list.map((z) => ZoneResponseDto.fromEntity(z));
  }
}
