import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetZoneQuery } from './get-zone.query';
import { ZoneResponseDto } from '../../../dto/zone-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IZoneRepository } from '../../../domain/repositories/zone.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetZoneQuery)
export class GetZoneHandler implements BaseQueryHandler<GetZoneQuery, ZoneResponseDto>, IQueryHandler<GetZoneQuery> {
  constructor(@Inject('IZoneRepository') private readonly repository: IZoneRepository) {}

  async execute(query: GetZoneQuery): Promise<ZoneResponseDto> {
    const zone = await this.repository.findById(query.id);
    if (!zone) throw new NotFoundException(`Zone '${query.id}' not found.`);
    return ZoneResponseDto.fromEntity(zone);
  }
}
