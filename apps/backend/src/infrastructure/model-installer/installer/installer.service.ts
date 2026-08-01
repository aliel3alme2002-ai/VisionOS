import { Injectable } from '@nestjs/common';
import { ArtifactInstaller } from './artifact-installer';
import { Artifact } from '../models/artifact';
import { ArtifactInstallation } from '../models/artifact-installation';

@Injectable()
export class InstallerService {
  private readonly installations: Map<string, ArtifactInstallation> = new Map();

  constructor(private readonly installer: ArtifactInstaller) {}

  public async installArtifact(artifact: Artifact): Promise<ArtifactInstallation> {
    const result = await this.installer.install(artifact);
    this.installations.set(result.installationId, result);
    return result;
  }

  public getInstallationStatus(installationId: string): ArtifactInstallation | null {
    return this.installations.get(installationId) ?? null;
  }
}
