import { Building } from '../domain/building';
import { Floor } from '../domain/floor';

export const HIERARCHY_REPOSITORY = Symbol('HIERARCHY_REPOSITORY');

export interface HierarchyRepository {
  findBuildingById(id: string, hotelId: string): Promise<Building | null>;
  findBuildingsByHotelId(hotelId: string): Promise<Building[]>;
  createBuilding(building: Building): Promise<void>;

  findFloorById(id: string, buildingId: string): Promise<Floor | null>;
  findFloorsByBuildingId(buildingId: string): Promise<Floor[]>;
  createFloor(floor: Floor): Promise<void>;
}
