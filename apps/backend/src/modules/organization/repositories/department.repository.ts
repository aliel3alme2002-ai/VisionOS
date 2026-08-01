import { Department } from '../domain/department';

export const DEPARTMENT_REPOSITORY = Symbol('DEPARTMENT_REPOSITORY');

export interface DepartmentRepository {
  findById(id: string, organizationId: string): Promise<Department | null>;
  findByOrganizationId(organizationId: string): Promise<Department[]>;
  create(department: Department): Promise<void>;
}
