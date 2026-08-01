import { Injectable, Inject } from '@nestjs/common';
import { BaseRepository } from '../../database/base.repository';
import { HierarchyRepository } from '../../../modules/organization/repositories/hierarchy.repository';
import { Building } from '../../../modules/organization/domain/building';
import { Floor } from '../../../modules/organization/domain/floor';
import { DATABASE_CLIENT } from '../../database/prisma.module';
import { DatabaseClient } from '../../database/database-client.interface';

@Injectable()
export class PrismaHierarchyRepository extends BaseRepository implements HierarchyRepository {
  constructor(@Inject(DATABASE_CLIENT) db: DatabaseClient) {
    super(db);
  }

  public async findBuildingById(id: string, hotelId: string): Promise<Building | null> {
    const record = await this.db.client.building.findFirst({
      where: { id, hotelId },
    });
    if (!record) return null;
    return this.mapToBuildingDomain(record);
  }

  public async findBuildingsByHotelId(hotelId: string): Promise<Building[]> {
    const records = await this.db.client.building.findMany({
      where: { hotelId },
    });
    return records.map((r: any) => this.mapToBuildingDomain(r));
  }

  public async createBuilding(building: Building): Promise<void> {
    await this.db.client.building.create({
      data: {
        id: building.id,
        hotelId: building.hotelId,
        name: building.name,
      },
    });
  }

  public async findFloorById(id: string, buildingId: string): Promise<Floor | null> {
    const record = await this.db.client.floor.findFirst({
      where: { id, buildingId },
    });
    if (!record) return null;
    return this.mapToFloorDomain(record);
  }

  public async findFloorsByBuildingId(buildingId: string): Promise<Floor[]> {
    const records = await this.db.client.floor.findMany({
      where: { buildingId },
    });
    return records.map((r: any) => this.mapToFloorDomain(r));
  }

  public async createFloor(floor: Floor): Promise<void> {
    await this.db.client.floor.create({
      data: {
        id: floor.id,
        buildingId: floor.buildingId,
        name: floor.name,
        level: floor.level,
      },
    });
  }

  private mapToBuildingDomain(record: any): Building {
    return {
      id: record.id,
      hotelId: record.hotelId,
      name: record.name,
    };
  }

  private mapToFloorDomain(record: any): Floor {
    return {
      id: record.id,
      buildingId: record.buildingId,
      name: record.name,
      level: record.level,
    };
  }
}
