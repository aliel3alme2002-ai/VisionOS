export interface UserAvatarProps {
  storageObjectId?: string | null;
  thumbnailUrl?: string | null;
}

export class UserAvatar {
  public readonly storageObjectId: string | null;
  public readonly thumbnailUrl: string | null;

  constructor(props?: UserAvatarProps) {
    this.storageObjectId = props?.storageObjectId ?? null;
    this.thumbnailUrl = props?.thumbnailUrl ?? null;
  }

  public update(storageObjectId: string, thumbnailUrl: string): UserAvatar {
    return new UserAvatar({ storageObjectId, thumbnailUrl });
  }
}
