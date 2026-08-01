import { Injectable } from '@nestjs/common';
import { ICameraRepository } from './camera.repository';
import { ICameraGroupRepository } from './camera-group.repository';
import { IStreamProfileRepository } from './stream-profile.repository';
import { IEdgeNodeRepository } from './edge-node.repository';

import { Camera } from '../entities/camera';
import { CameraGroup } from '../entities/camera-group';
import { StreamProfile } from '../entities/stream-profile';
import { EdgeNode } from '../entities/edge-node';

@Injectable()
export class InMemoryCameraRepository implements ICameraRepository {
  private readonly storage = new Map<string, Camera>();

  async save(camera: Camera): Promise<void> { this.storage.set(camera.id, camera); }
  async findById(id: string, includeDeleted = false): Promise<Camera | null> {
    const cam = this.storage.get(id);
    if (!cam) return null;
    if (!includeDeleted && cam.isDeleted()) return null;
    return cam;
  }
  async findByOrgId(organizationId: string, includeDeleted = false): Promise<Camera[]> {
    const list: Camera[] = [];
    for (const c of this.storage.values()) {
      if (c.organizationId === organizationId && (includeDeleted || !c.isDeleted())) {
        list.push(c);
      }
    }
    return list;
  }
  async findByIpOrMac(ipAddress: string, macAddress?: string | null): Promise<Camera | null> {
    for (const c of this.storage.values()) {
      if (c.ipAddress === ipAddress) return c;
      if (macAddress && c.macAddress && c.macAddress.toLowerCase() === macAddress.toLowerCase()) return c;
    }
    return null;
  }
}

@Injectable()
export class InMemoryCameraGroupRepository implements ICameraGroupRepository {
  private readonly storage = new Map<string, CameraGroup>();

  async save(group: CameraGroup): Promise<void> { this.storage.set(group.id, group); }
  async findById(id: string): Promise<CameraGroup | null> { return this.storage.get(id) ?? null; }
  async findByOrgId(organizationId: string): Promise<CameraGroup[]> {
    return Array.from(this.storage.values()).filter((g) => g.organizationId === organizationId);
  }
  async delete(id: string): Promise<void> { this.storage.delete(id); }
}

@Injectable()
export class InMemoryStreamProfileRepository implements IStreamProfileRepository {
  private readonly storage = new Map<string, StreamProfile>();

  async save(profile: StreamProfile): Promise<void> { this.storage.set(profile.id, profile); }
  async findById(id: string): Promise<StreamProfile | null> { return this.storage.get(id) ?? null; }
  async findAll(): Promise<StreamProfile[]> { return Array.from(this.storage.values()); }
}

@Injectable()
export class InMemoryEdgeNodeRepository implements IEdgeNodeRepository {
  private readonly storage = new Map<string, EdgeNode>();

  async save(node: EdgeNode): Promise<void> { this.storage.set(node.id, node); }
  async findById(id: string, includeDeleted = false): Promise<EdgeNode | null> {
    const node = this.storage.get(id);
    if (!node) return null;
    if (!includeDeleted && node.isDeleted()) return null;
    return node;
  }
  async findByOrgId(organizationId: string, includeDeleted = false): Promise<EdgeNode[]> {
    return Array.from(this.storage.values()).filter((n) => n.organizationId === organizationId && (includeDeleted || !n.isDeleted()));
  }
}
