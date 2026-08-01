import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPermissionQuery } from './get-permission.query';
import { PermissionResponseDto } from '../../dto/permission-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IPermissionRepository } from '../../../domain/repositories/permission.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetPermissionQuery)
export class GetPermissionHandler implements BaseQueryHandler<GetPermissionQuery, PermissionResponseDto>, IQueryHandler<GetPermissionQuery> {
  constructor(@Inject('IPermissionRepository') private readonly repository: IPermissionRepository) {}

  async execute(query: GetPermissionQuery): Promise<PermissionResponseDto> {
    const p = await this.repository.findById(query.id);
    if (!p) throw new NotFoundException(`Permission '${query.id}' not found.`);
    return PermissionResponseDto.fromEntity(p);
  }
}
