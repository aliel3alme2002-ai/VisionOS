import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { HotelRepository } from '../../../modules/organization/repositories/hotel.repository';
import { Hotel } from '../../../modules/organization/domain/hotel';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaHotelRepository extends BaseRepository implements HotelRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async findById(id: string, organizationId: string): Promise<Hotel | null> {
    const record = await this.db.client.hotel.findFirst({
      where: { id, organizationId },
    });
    if (!record) return null;
    return this.mapToDomain(record);
  }

  public async findByOrganizationId(organizationId: string): Promise<Hotel[]> {
    const records = await this.db.client.hotel.findMany({
      where: { organizationId },
    });
    return records.map((r: any) => this.mapToDomain(r));
  }

  public async create(hotel: Hotel): Promise<void> {
    await this.db.client.hotel.create({
      data: {
        id: hotel.id,
        organizationId: hotel.organizationId,
        name: hotel.name,
        code: hotel.code,
        timezone: hotel.timezone,
        status: hotel.status,
      },
    });
  }

  private mapToDomain(record: any): Hotel {
    return {
      id: record.id,
      organizationId: record.organizationId,
      name: record.name,
      code: record.code,
      timezone: record.timezone,
      status: record.status as any,
    };
  }
}
