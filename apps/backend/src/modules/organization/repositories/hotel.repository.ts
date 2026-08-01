import { Hotel } from '../domain/hotel';

export const HOTEL_REPOSITORY = Symbol('HOTEL_REPOSITORY');

export interface HotelRepository {
  findById(id: string, organizationId: string): Promise<Hotel | null>;
  findByOrganizationId(organizationId: string): Promise<Hotel[]>;
  create(hotel: Hotel): Promise<void>;
}
