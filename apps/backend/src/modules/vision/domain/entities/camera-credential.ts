export interface CameraCredentialProps {
  id: string;
  username: string;
  passwordReference: string;
  authenticationType?: string;
}

export class CameraCredential {
  public readonly id: string;
  public readonly username: string;
  public readonly passwordReference: string;
  public readonly authenticationType: string;

  constructor(props: CameraCredentialProps) {
    this.id = props.id;
    this.username = props.username;
    this.passwordReference = props.passwordReference;
    this.authenticationType = props.authenticationType ?? 'BASIC';
  }
}
