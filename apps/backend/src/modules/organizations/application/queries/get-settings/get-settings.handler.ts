import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetSettingsQuery } from './get-settings.query';
import { BaseQueryHandler } from '../../../../application/common/base/base-query-handler';
import { IOrganizationRepository } from '../../../domain/repositories/organization.repository';
import { NotFoundException } from '../../../../application/common/exceptions/not-found.exception';

@QueryHandler(GetSettingsQuery)
export class GetSettingsHandler
  implements BaseQueryHandler<GetSettingsQuery, any>, IQueryHandler<GetSettingsQuery>
{
  constructor(
    @Inject('IOrganizationRepository')
    private readonly repository: IOrganizationRepository,
  ) {}

  async execute(query: GetSettingsQuery): Promise<any> {
    const org = await this.repository.findById(query.id);
    if (!org) {
      throw new NotFoundException(`Organization with ID '${query.id}' not found.`);
    }
    return {
      timezone: org.settings.timezone,
      locale: org.settings.locale,
      currency: org.settings.currency,
      dateFormat: org.settings.dateFormat,
      timeFormat: org.settings.timeFormat,
    };
  }
}
