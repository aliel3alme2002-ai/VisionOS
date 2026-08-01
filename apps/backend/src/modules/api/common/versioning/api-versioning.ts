import { VersioningType, VersioningOptions } from '@nestjs/common';

export const API_VERSION_HEADER = 'x-api-version';

export enum ApiVersion {
  V1 = '1',
  V2 = '2',
}

export const API_VERSIONING_OPTIONS: VersioningOptions = {
  type: VersioningType.URI,
  defaultVersion: ApiVersion.V1,
  prefix: 'api/v',
};
