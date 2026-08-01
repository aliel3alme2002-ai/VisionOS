import { Camera } from '../entities/camera';

export interface ICameraRepository {
  save(camera: Camera): Promise<void>;
  findById(id: string, includeDeleted?: boolean): Promise<Camera | null>;
  findByOrgId(organizationId: string, includeDeleted?: boolean): Promise<Camera[]>;
  findByIpOrMac(ipAddress: string, macAddress?: string | null): Promise<Camera | null>;
}
