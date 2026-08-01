import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetRuntimeQuery } from './get-runtime.query';
import { RuntimeResponseDto } from '../../../dto/runtime-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IRuntimeRepository } from '../../../domain/repositories/runtime.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetRuntimeQuery)
export class GetRuntimeHandler implements BaseQueryHandler<GetRuntimeQuery, RuntimeResponseDto>, IQueryHandler<GetRuntimeQuery> {
  constructor(@Inject('IRuntimeRepository') private readonly repository: IRuntimeRepository) {}

  async execute(query: GetRuntimeQuery): Promise<RuntimeResponseDto> {
    const r = await this.repository.findById(query.id);
    if (!r) throw new NotFoundException(`Runtime '${query.id}' not found.`);
    return RuntimeResponseDto.fromEntity(r);
  }
}
