export interface JwtPayload {
  sub: string;
  org?: string;
  roles?: string[];
  permissions?: string[];
  type?: string;
}

export interface JwtProvider {
  sign(payload: JwtPayload, expiresIn: string): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
}
