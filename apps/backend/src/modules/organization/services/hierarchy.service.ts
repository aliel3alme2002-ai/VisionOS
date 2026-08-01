import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { HotelRepository, HOTEL_REPOSITORY } from '../repositories/hotel.repository';
import { HierarchyRepository, HIERARCHY_REPOSITORY } from '../repositories/hierarchy.repository';
import { DepartmentRepository, DEPARTMENT_REPOSITORY } from '../repositories/department.repository';
import { Hotel } from '../domain/hotel';
import { Building } from '../domain/building';
import { Floor } from '../domain/floor';
import { Department } from '../domain/department';

@Injectable()
export class HierarchyService {
  constructor(
    @Inject(HOTEL_REPOSITORY) private readonly hotelRepository: HotelRepository,
    @Inject(HIERARCHY_REPOSITORY) private readonly hierarchyRepository: HierarchyRepository,
    @Inject(DEPARTMENT_REPOSITORY) private readonly departmentRepository: DepartmentRepository,
  ) {}

  public async getHotel(id: string, organizationId: string): Promise<Hotel> {
    const hotel = await this.hotelRepository.findById(id, organizationId);
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  public async getBuilding(id: string, hotelId: string): Promise<Building> {
    const building = await this.hierarchyRepository.findBuildingById(id, hotelId);
    if (!building) {
      throw new NotFoundException('Building not found');
    }
    return building;
  }

  public async getFloor(id: string, buildingId: string): Promise<Floor> {
    const floor = await this.hierarchyRepository.findFloorById(id, buildingId);
    if (!floor) {
      throw new NotFoundException('Floor not found');
    }
    return floor;
  }

  public async getDepartment(id: string, organizationId: string): Promise<Department> {
    const department = await this.departmentRepository.findById(id, organizationId);
    if (!department) {
      throw new NotFoundException('Department not found');
    }
    return department;
  }

  public async listHotels(organizationId: string): Promise<Hotel[]> {
    return this.hotelRepository.findByOrganizationId(organizationId);
  }
}
