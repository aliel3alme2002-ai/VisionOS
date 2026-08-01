import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPermissionsQuery } from './list-permissions.query';
import { PermissionResponseDto } from '../../dto/permission-response.dto';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IPermissionRepository } from '../../../domain/repositories/permission.repository';

@QueryHandler(ListPermissionsQuery)
export class ListPermissionsHandler implements BaseQueryHandler<ListPermissionsQuery, PermissionResponseDto[]>, IQueryHandler<ListPermissionsQuery> {
  constructor(@Inject('IPermissionRepository') private readonly repository: IPermissionRepository) {}

  async execute(_query: ListPermissionsQuery): Promise<PermissionResponseDto[]> {
    const list = await this.repository.findAll();
    return list.map((p) => PermissionResponseDto.fromEntity(p));
  }
}
