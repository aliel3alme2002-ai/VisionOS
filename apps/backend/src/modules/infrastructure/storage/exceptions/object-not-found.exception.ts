import { StorageException } from './storage.exception';

export class ObjectNotFoundException extends StorageException {
  constructor(key: string) {
    super('Object not found: ' + key);
    this.name = 'ObjectNotFoundException';
  }
}
