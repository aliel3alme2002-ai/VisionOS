import { StorageException } from './storage.exception';

export class UploadFailedException extends StorageException {
  constructor(reason: string) {
    super('Upload failed: ' + reason);
    this.name = 'UploadFailedException';
  }
}
