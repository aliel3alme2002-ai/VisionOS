import { StorageException } from './storage.exception';

export class DownloadFailedException extends StorageException {
  constructor(reason: string) {
    super('Download failed: ' + reason);
    this.name = 'DownloadFailedException';
  }
}
